<script>
import axios from 'axios';
import { ref } from 'vue';
const apiUrlRestaurant = 'http://127.0.0.1:8000/api/restaurants/';
const apiUrlType = 'http://127.0.0.1:8000/api/types/';
const apiUrlDish = 'http://127.0.0.1:8000/api/dishes/';
import { store } from '../data/store';

export default {
    name: 'RestaurantDetails',
    props: { res_type: Object },
    data() {
        return {
            restaurant: {},
            dishes: [],
            restaurant_dishes: [],
            choosenDishes: [],
            amounts: [],
            store,
            indecs: 0
        }
    },
    methods: {
        fetchRestaurant() {
            axios.get(apiUrlRestaurant + this.$route.params.id).then(res => {
                this.restaurant = res.data;
            })
        },
        fetchType() {
            axios.get(apiUrlType + this.$route.params.id).then(res => {
                this.res_type = res.data;
                // console.log(res_type);
            })
        },
        fetchDish() {
            axios.get(apiUrlDish).then(res => {
                this.dishes = res.data;
                this.dishes.forEach(dish => {
                    if (this.$route.params.id == dish.restaurant_id) {
                        this.restaurant_dishes.push(dish)
                    }
                });
            })
        },
        addMeal(text, price, amount, currentId, restaurant_id) {
            // const mealStorage = localStorage.setItem('orders', JSON.stringify(store.cart))
            let flag = false
            let targetId = 0
            let storage_dishes = []
            let storage_first_restaurant_id = 0

            // !important +++++++++++++++++++++++++++++++++++++++++++
            //console.log('questo qui =>', storage_dishes)
            if (JSON.parse(localStorage.getItem('orders'))) {
                console.log('entrato')
                storage_dishes = JSON.parse(localStorage.getItem('orders'))
                storage_first_restaurant_id = storage_dishes[0].restaurant_id
                console.log('1')
            }
            //console.log('questo =>', storage_dishes[0].restaurant_id)

            if (restaurant_id != storage_first_restaurant_id) {
                localStorage.removeItem('orders')
                store.cart = []
                console.log('2')
            }
            // !important +++++++++++++++++++++++++++++++++++++++++++



            if (amount > 0) {
                for (let i = 0; i < store.cart.length; i++) {
                    if (store.cart[i].id == currentId) {
                        flag = true
                        targetId = store.cart[i].id
                        console.log('3')
                    }
                }


                //! important +++++++++++++++++++++++++++++++++++++++++++
                if (!flag) {
                    console.log('pusho')
                    console.log('4')
                    store.cart.push({
                        'name': text,
                        'price': price,
                        'amount': amount,
                        'id': currentId,
                        'restaurant_id': restaurant_id
                    });
                    // !important +++++++++++++++++++++++++++++++++++++++++++


                } else {
                    const targetDish = targetId
                    console.log('5')
                    // console.log('target id =>', targetId)

                    // console.log('sostituisco', targetDish)
                    for (let x = 0; x < store.cart.length; x++) {
                        if (store.cart[x].id == targetDish) {
                            store.cart.splice(x, 1);
                        }

                    }

                    store.cart.push({
                        'name': text,
                        'price': price,
                        'amount': amount,
                        'id': currentId,
                        'restaurant_id': restaurant_id
                    })
                }

                localStorage.setItem('orders', JSON.stringify(store.cart));
                store.count_dishes = store.count_dishes
                console.log('6')
                //console.log(store.cart)
                //console.log(localStorage.getItem('orders'))
            }

            // // localStorage.setItem(i, [
            // //     text,
            // //     price,
            // //     amount
            // // ])

            // // let esempio = 

            // console.log(localStorage.getItem(i))
            // console.log(store.cart)
        },
        fillStore() {
            for (let i = 0; i <= localStorage.getItem('maxI'); i++) {
                const jsonObject = JSON.parse(localStorage.getItem(i))
                if (jsonObject && store.cart.length <= localStorage.getItem('maxI')) {

                    store.cart.push(jsonObject)
                    // for (let i = 0; i <= localStorage.getItem('maxI'); i++) {
                    // }
                }
            }
        }
    },
    // computed: {
    //     createAmounts() {
    //         this.restaurant_dishes.forEach((dish, i) => {
    //             this.amounts.push(0)
    //         });
    //     }
    // },
    created() {
        this.fetchRestaurant();
        this.fetchDish()
        // // this.fetchType();
        this.fillStore()
    }
}
</script>

<template>
    <img :src="restaurant.image" class="img-res" :alt="restaurant.name">
    <div class="container my-5 custom-pos text-center">
        <h1 class="">{{ restaurant.name }}</h1>
    </div>
    <div class="container carte pb-2">
        <p>{{ restaurant.description }}</p>
        <div class="card p-3 my-2 d-flex" v-for="(dish, i) in restaurant_dishes" :key="dish.id">
            <form class="d-flex justify-content-between"
                @submit.prevent="addMeal(dish['name'], dish['price'], amounts[i], dish['id'], dish['restaurant_id'])">


                <div class="d-flex flex-column  justify-content-between">
                    <div>
                        <h2 class="p-0 custom-text-title">{{ dish["name"] }}</h2>
                        <p class="mb-5 p-0 fs-5">{{ dish["description"] }}</p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center">
                        <p class="m-0 mt-1 p-0 text-custom-secondary">{{ dish["price"] }} €</p>
                        <input name="amount" v-model="amounts[i]" type="number" min="0" placeholder="0" step="1"
                            class="mx-3 mt-1">
                        <button type="submit" class="btn btn-custom-secondary d-flex align-items-center">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
                <img :src="dish.image" class="img-dish img-fluid" :alt="dish.name">
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.img-res {
    width: 100%;
    max-height: 450px;
    object-fit: cover;
    // position: relative;
}

.img-dish {
    max-width: 210px;
    border-radius: 0 5px 5px 0;
}

.custom-pos {
    // height: 450px;
    // position: absolute;
    // bottom: 50%;
    // left: 50%;
    // transform: translateX(-50%);
    // transform: translateY(-50%);

    h1 {
        font-size: 100px;
        color: var(--d-blue);
        // text-shadow: rgba($color: #000000, $alpha: 1) 1px 0 10px;
    }

}

p {
    // text-shadow: rgba($color: #000000, $alpha: 1) 1px 0 10px;
    // color: var(--black);
    font-size: 20px;
}

.carte {
    margin-top: 50px;
}

input {
    border-radius: 15px;
    max-width: 85px;
    padding: 0px 10px;
    color: var(--l-blue);
}

input:focus-visible {
    outline-color: var(--p-orange);
}

.card {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
}

@media screen and (max-width: 768px) {
    .custom-pos {
        top: 240px;
    }
}

@media screen and (max-width: 761px) {
    .custom-pos {
        top: 325px;
    }
}

@media screen and (max-width: 576px) {
    .custom-pos {
        top: 325px;
    }
}
</style>
