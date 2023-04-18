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
                class="btn btn-custom-secondary">
                Torna al ristorante
            </router-link>

            <router-link v-if="store.restaurantDetailsId === undefined" :to="{ name: 'home' }"
                class="btn btn-custom-secondary">
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
                                <button type="submit" class="btn btn-custom-secondary">Rimuovi dal carrello</button>
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
            </div>
        </div>

        <h4 class="mt-4" v-if="allOrder.length">Infomazioni di consegna</h4>
        <form action="" v-if="allOrder.length" class="row">
            <div class="mb-3 col-6">
                <label for="customer_name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="customer_name">
            </div>
            <div class="mb-3 col-6">
                <label for="customer_surname" class="form-label">Cognome</label>
                <input type="text" class="form-control" id="customer_surname">
            </div>
            <div class="mb-3 col-12">
                <label for="customer_address" class="form-label">Indirizzo</label>
                <input type="text" class="form-control" id="customer_address">
            </div>
            <div class="mb-3 col-6">
                <label for="customer_email" class="form-label">Indirizzo Email</label>
                <input type="email" class="form-control" id="customer_email">
            </div>
            <div class="mb-3 col-6">
                <label for="customer_phone_number" class="form-label">Numero di Telefono</label>
                <input type="tel" class="form-control" id="customer_phone_number">
            </div>

            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-custom-secondary">Vai al pagamrento</button>
            </div>
        </form>
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