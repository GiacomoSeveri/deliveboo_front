<script>
import { store } from '../data/store';

export default {
    name: 'CartPage',
    data() {
        return {
            store,
            // funzionava prima allOrder: JSON.parse(localStorage.getItem('orders')),
            allOrder: JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
        }
    },
    methods: {
        deleteFromCart(i) {
            this.allOrder.splice(i, 1);
            localStorage.removeItem('orders')
            localStorage.setItem('orders', JSON.stringify(this.allOrder))
            store.cart = [];
            store.cart = (JSON.parse(localStorage.getItem('orders')));
            console.log(store.cart);

            if (localStorage.getItem('orders') === '[]') {
                localStorage.removeItem('orders');
                store.current_restaurant_id = 0;
            }

        },
        getMeals() {
            localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
        }
    },
    computed: {
        totalPrice() {
            let totalPrice = 0
            for (let i = 0; i < this.allOrder.length; i++) {
                totalPrice += this.allOrder[i].price * this.allOrder[i].amount
            }
            return totalPrice
        }
    },
    created() {
        store.restaurantDetailsId = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders'))[0].restaurant_id : undefined;
        console.log(store.restaurantDetailsId);
    }
}
</script>

<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Il tuo carrello</h1>

            <!-- buttons to come back -->
            <router-link v-if="store.restaurantDetailsId >= 1" :to="{ path: '/Restaurants/' + store.restaurantDetailsId }"
                class="btn btn-custom-secondary"><i class="fa-solid fa-reply me-2"></i>
                Torna al ristorante
            </router-link>

            <router-link v-if="store.restaurantDetailsId === undefined" :to="{ name: 'home' }"
                class="btn btn-custom-secondary"><i class="fa-solid fa-house"></i>
                Torna alla home
            </router-link>

        </div>
        <div class="card mt-4">
            <h4 class="custom-p m-0">I tuoi ordini</h4>
            <table class="table table-hover m-0">
                <thead>
                    <tr>
                        <th class="custom-p" scope="col">Piatto</th>
                        <th class="custom-p" scope="col">Quantità</th>
                        <th class="custom-p" scope="col">Prezzo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(singleOrder, i) in allOrder">
                        <td class="custom-p">{{ singleOrder.name }}</td>
                        <td class="custom-p">{{ singleOrder.amount }}</td>
                        <td class="custom-p">€{{ singleOrder.price * singleOrder.amount }}</td>
                        <td class="text-end custom-p">
                            <form @submit.prevent="deleteFromCart(i)">
                                <button type="submit" class="btn btn-custom-secondary"><i
                                        class="fa-solid fa-xmark me-2"></i>Rimuovi dal carrello</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="custom-p" v-if="!store.cart">
                Non hai ancora effettuato ordini
            </div>
            <div class="custom-p d-flex justify-content-between align-items-center">
                <span>
                    Prezzo Totale: €{{ totalPrice }}
                </span>

                <a href="http://127.0.0.1:8000/payments" class="btn btn-custom-secondary">Completa ordine</a>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: var(--d-blue);
}

.custom-p {
    padding: 10px 20px;
}
</style>