<script>
import axios from 'axios';
import { ref, shallowReactive } from 'vue';
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
            isLoading: false,
            hasError: false,
            showModal: false,
            canProceed: false,

            // variables taken from function addMeal
            text: '',
            price: 0,
            amount: 0,
            currentId: 0,
            restaurant_id: 0,
        }
    },
    computed: {
        // setAmount() {
        //     const storage = localStorage.getItem('orders')
        //     if (storage || store.cart) {
        //         const res_id = JSON.parse(storage).restaurant_id
        //         const dish_id = JSON.parse(storage).id
        //     }
        // }

    },
    methods: {
        fetchRestaurant() {
            this.isLoading = true;
            axios.get(apiUrlRestaurant + this.$route.params.id)
                .then(res => {
                    this.restaurant = res.data;
                    this.setAmount();
                })
                .catch(() => { this.hasError = true })
                .then(() => { this.isLoading = false })
        },
        fetchType() {
            this.isLoading = true
            axios.get(apiUrlType + this.$route.params.id)
                .then(res => {
                    this.res_type = res.data;
                    // console.log(res_type);
                })
                .catch(() => { this.hasError = true })
                .then(() => { this.isLoading = false })
        },
        fetchDish() {
            this.isLoading = true
            axios.get(apiUrlDish)
                .then(res => {
                    this.dishes = res.data;
                    this.dishes.forEach(dish => {
                        if (this.$route.params.id == dish.restaurant_id) {
                            this.restaurant_dishes.push(dish)
                        }
                    });
                })
                .catch(() => { this.hasError = true })
                .then(() => { this.isLoading = false })
        },

        setAmount() {
            this.amounts = [];
            store.counting_amounts = [];
            if (localStorage.getItem('orders')) {
                console.log('asd: ' + JSON.parse(localStorage.getItem('orders'))[0].restaurant_id)
                console.log(this.restaurant)
                if (JSON.parse(localStorage.getItem('orders'))[0].restaurant_id === this.restaurant.id) {
                    JSON.parse(localStorage.getItem('orders')).forEach(item => {
                        item.amount
                        store.counting_amounts.push(item.amount)
                        console.log(item.amount)
                    })

                    this.amounts = store.counting_amounts
                    return this.amounts
                }
            }
        },

        addMeal(text, price, amount, currentId, restaurant_id) {
            this.text = text;
            this.price = price;
            this.amount = amount;
            this.currentId = currentId;
            this.restaurant_id = restaurant_id;

            if (store.current_restaurant_id) {
                if (store.current_restaurant_id === 0) {
                    console.log('A')
                    this.showModal = false;
                    this.canProceed = true;
                }
                else if (this.restaurant['id'] !== store.current_restaurant_id) {
                    console.log('B')
                    this.showModal = true;
                    return this.canProceed = false;
                }
            }

            if (this.canProceed = true) {

                let flag = false
                let targetId = 0
                let storage_dishes = []
                let storage_first_restaurant_id = 0

                // removing dish from input in page restaurant details
                if (amount === 0) {
                    if (localStorage.getItem('orders')) {
                        localStorage.removeItem('orders')
                        store.cart = []
                    }
                }


                if (JSON.parse(localStorage.getItem('orders'))) {
                    storage_dishes = JSON.parse(localStorage.getItem('orders'))
                    storage_first_restaurant_id = storage_dishes[0].restaurant_id
                }

                if (restaurant_id != storage_first_restaurant_id) {
                    localStorage.removeItem('orders')
                    store.cart = []

                    if (store.current_restaurant_id != this.restaurant['id'] && store.current_restaurant_id !== 0) {
                        this.showModal = true;
                    }

                }


                if (amount > 0) {
                    for (let i = 0; i < store.cart.length; i++) {
                        if (store.cart[i].id == currentId) {
                            flag = true
                            targetId = store.cart[i].id
                        }
                    }
                    if (!flag) {
                        store.cart.push({
                            'name': text,
                            'price': price,
                            'amount': amount,
                            'id': currentId,
                            'restaurant_id': restaurant_id
                        });
                    } else {
                        const targetDish = targetId

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

                    store.current_restaurant_id = this.restaurant['id']

                    console.log('current restaurant id on page: ' + this.restaurant['id'])
                    localStorage.setItem('orders', JSON.stringify(store.cart));

                }
            }

        },
        fillStore() {
            for (let i = 0; i <= localStorage.getItem('maxI'); i++) {
                const jsonObject = JSON.parse(localStorage.getItem(i))
                if (jsonObject && store.cart.length <= localStorage.getItem('maxI')) {

                    store.cart.push(jsonObject)
                }
            }
        },
        cancel() {
            this.canProceed = false;
            this.showModal = false;
        },
        changeDish() {
            //resetting local storage and store.cart
            localStorage.removeItem('orders')
            store.cart = [];
            console.log('store.cart: ' + store.cart)

            // sync of store restaurant id and restaurant id of current page
            store.current_restaurant_id = this.restaurant['id'];
            this.canProceed = true;
            this.showModal = false;

            this.addMeal(this.text, this.price, this.amount, this.currentId, this.restaurant_id)
        },

        changeButton(dish_id) {
            // passare id del piatto specifico
            // fare un include nell'array dei dishes_id
            // return del valore true/false
            const dishes_id = [];
            let isButtonTexted = false;
            if (store.cart.length) {
                JSON.parse(localStorage.getItem('orders')).forEach(dish => {
                    dishes_id.push(dish.id)
                });
            }

            if (dishes_id.includes(dish_id)) {
                isButtonTexted = true;
            }
            return isButtonTexted
        }


    },
    created() {
        this.fetchRestaurant();
        this.fetchDish()
        // // this.fetchType();
        this.fillStore();
        this.setAmount();
        //console.log('current id on store: ' + store.current_restaurant_id)
        //console.log(this.restaurant_dishes)

    }
}
</script>

<template>
    <!-- loader -->
    <AppLoader v-if="isLoading" />

    <!-- modal -->
    <div v-if="showModal" class="modale d-flex justify-content-center align-items-center">
        <div class="box-modale">
            <p><span class="text-danger">Attenzione!</span></p>
            <p>Stai visitando un altro ristorante. Se intendi aggiungere questo piatto al carrello, verranno cancellate le
                tue precedenti scelte.</p>
            <p>Sei sicuro di voler procedere?</p>
            <button class="btn btn-custom-secondary me-3" type="button" @click="changeDish">Procedi</button>
            <button class="btn btn-custom-secondary" type="button" @click="cancel">Annulla</button>
        </div>
    </div>

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

                    <!-- price, input and button -->
                    <div class="d-flex justify-content-start align-items-center">
                        <p class="m-0 mt-1 p-0 text-custom-secondary">{{ dish["price"] }} €</p>

                        <!-- <input v-if="quantity" name="amount" v-model="quantity" type="number" min="1" step="1"
                                                                                                                         class="mx-3 mt-1"> -->
                        <input name="amount" v-model="amounts[i]" type="number" min="1" step="1" class="mx-3 mt-1">

                        <button v-if="changeButton(dish.id)" type="submit"
                            class="btn btn-custom-secondary d-flex align-items-center">
                            Aggiorna quantità
                        </button>
                        <button v-else type="submit" class="btn btn-custom-secondary d-flex align-items-center">
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
.modale {
    background-color: rgba($color: #000000, $alpha: 0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    .box-modale {
        background-color: white;
        border-radius: 5px;
        width: 50%;
        padding: 25px;

        .text-danger {
            font-size: 2rem;
        }
    }
}

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
    border-radius: 10px;
    max-width: 55px;
    padding: 0px 10px;
    color: var(--l-blue);
    border: solid 1px var(--l-blue);
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
