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
            message: 'Attenzione, stai aggiungendo al carrello un piatto di un ristorante diverso da quello presente nel carrello, così facendo cancellerai tutti i piatti finora inseriti ed inizierai un nuovo ordine. Sei sicuro di voler procedere?',
            restaurant: {},
            dishes: [],
            restaurant_dishes: [],
            choosenDishes: [],
            amounts: [],
            store,
            isLoading: false,
            hasError: false,
            showModal: true,
        }
    },
    methods: {
        fetchRestaurant() {
            this.isLoading = true;
            axios.get(apiUrlRestaurant + this.$route.params.id)
                .then(res => {
                    this.restaurant = res.data;
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
        addMeal(text, price, amount, currentId, restaurant_id) {

            /*
            const objectDish = { 'currentId': currentId, 'amount': amount, 'restaurant_id': restaurant_id };
            this.restaurant_dishes.push(objectDish);
            console.log(this.restaurant_dishes);
            */

            let flag = false
            let targetId = 0
            let storage_dishes = []
            let storage_first_restaurant_id = 0


            if (JSON.parse(localStorage.getItem('orders'))) {
                console.log('entrato')
                storage_dishes = JSON.parse(localStorage.getItem('orders'))
                storage_first_restaurant_id = storage_dishes[0].restaurant_id
            }

            if (restaurant_id != storage_first_restaurant_id) {
                localStorage.removeItem('orders')
                store.cart = []

                if (store.current_restaurant_id != this.restaurant['id']) {
                    this.showModal = true;
                }

                //inserire una funzione che richiami una modale con il messaggio
            }

            /*
            if (store.restaurantDetailsId !== undefined) {
                if (restaurant_id !== store.restaurantDetailsId) {
                    console.log(this.message);
                }
            }
            */

            if (amount > 0) {
                for (let i = 0; i < store.cart.length; i++) {
                    if (store.cart[i].id == currentId) {
                        flag = true
                        targetId = store.cart[i].id
                    }
                }
                if (!flag) {
                    console.log('pusho')
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

                /*
                console.log(store.restaurantDetailsId)
                console.log(this.restaurant.id)
                if (this.restaurant.id !== store.restaurantDetailsId) {
                    console.log('hai cambiato rist')
                }
                */

                store.current_restaurant_id = this.restaurant['id']

                console.log(this.restaurant['id'])
                localStorage.setItem('orders', JSON.stringify(store.cart));

                // store.count_dishes = store.count_dishes;
            }

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
    created() {
        this.fetchRestaurant();
        this.fetchDish()
        // // this.fetchType();
        this.fillStore();
        console.log('current id: ' + store.current_restaurant_id)
    }
}
</script>

<template>
    <!-- loader -->
    <AppLoader v-if="isLoading" />

    <!-- modal -->
    <div class="modale d-flex justify-content-center align-items-center">
        <div class="box-modale">
            <p><span class="text-danger">Attenzione!</span></p>
            <p>Stai aggiungendo al carrello il piatto di un altro ristorante. Così facendo cancellerai tutti i piatti
                finora inseriti.</p>
            <p>Sei sicuro di voler procedere?</p>
            <button class="btn btn-custom-secondary me-3" type="button">Procedi</button>
            <button class="btn btn-custom-secondary" type="button">Annulla</button>
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
                    <div class="d-flex justify-content-start align-items-center">
                        <p class="m-0 mt-1 p-0 text-custom-secondary">{{ dish["price"] }} €</p>
                        <input name="amount" v-model="amounts[i]" type="number" min="0" step="1" placeholder="0"
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
