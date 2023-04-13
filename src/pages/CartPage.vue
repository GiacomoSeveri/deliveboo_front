<script>
import { store } from '../data/store';

export default {
    name: 'CartPage',
    data() {
        return {
            store,
        }
    },
    methods: {
        deleteFromCart(i) {
            store.cart.splice(i, 1)
        }
    },
    computed: {
        totalPrice() {
            let totalPrice = 0
            for (let i = 0; i < store.cart.length; i++) {
                totalPrice += store.cart[i].price * store.cart[i].amount
            }
            return totalPrice
        }
    }
}
</script>

<template>
    <div class="container mt-5">
        <h1>Il tuo carrello</h1>
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
                    <tr v-for="(order, i) in store.cart">
                        <td class="custom-p">{{ order.name }}</td>
                        <td class="custom-p">{{ order.amount }}</td>
                        <td class="custom-p">€{{ order.price * order.amount }}</td>
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
                    Prezzo Totale: {{ totalPrice }}
                </span>
                <form action="">
                    <button class="btn btn-custom-secondary">Conferma Ordine</button>
                </form>
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