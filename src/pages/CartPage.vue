<script>
import { store } from '../data/store';
import axios from 'axios';
import AppAlert from '../components/AppAlert.vue';
const endPointCustomerInfo = 'http://127.0.0.1:8000/api/orders/store';
const endPointOrders = 'http://127.0.0.1:8000/api';
//const emptyForm = { customer_name: '', customer_surname: '', customer_address: '', customer_email: '', customer_phone_number: '' }

export default {
    name: 'CartPage',
    data() {
        return {
            store,
            // funzionava prima allOrder: JSON.parse(localStorage.getItem('orders')),
            allOrder: JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : [],
            form: { delivery_address: '', customer_name: '', customer_surname: '', customer_phone_number: '', customer_email: '', total_price: 0, is_paid: true, dishes_id: [], amounts: [] },
            isLoading: false,
            has_errors: false,
            errors: {},
            alertMessage: null,
        }
    },
    components: { AppAlert },
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
        },
        validateCustomerForm() {
            this.errors = {};
            const errors = {};


            if (!this.form.customer_name) {
                errors.customer_name = "Il nome è obbligatorio"
            }
            if (!this.form.customer_surname) {
                errors.customer_surname = "Il cognome è obbligatorio"
            }
            if (!this.form.customer_email) {
                errors.customer_email = 'L\'email è obbligatoria!'
            }
            if (!this.form.customer_phone_number) {
                errors.customer_phone_number = 'Il numero di telefono è obbligatorio'
            }
            if (!this.form.customer_address) {
                errors.customer_address = 'L\'idirizzo di consegna è obbligatorio'
            }
            this.errors = errors;
        },
        sendCustomerForm() {
            //this.validateCustomerForm();
            //if (!this.hasErrors) {
            this.isLoading = true;
            axios.post(endPointCustomerInfo, this.form)
                .then(() => {
                    this.form = { delivery_address: '', customer_name: '', customer_surname: '', customer_phone_number: '', customer_email: '', total_price: 0, is_paid: true, dishes_id: [], amounts: [] };
                    window.location.replace("http://127.0.0.1:8000/payments");
                    localStorage.removeItem('orders');
                    store.cart = []
                })
                .catch(err => {
                    this.has_errors = true;
                    if (err.response.status === 400) {
                        const { errors } = err.response.data;
                        const errorMessages = {};
                        for (let key in errors) errorMessages[key] = errors[key][0];
                        this.errors = errorMessages;
                    } else {
                        this.errors = { network: 'Si è verificato un errore' };

                    }
                })
                .then(() => {

                    this.isLoading = false;
                })
            //}
        }
    },
    computed: {
        totalPrice() {
            let totalPrice = 0
            for (let i = 0; i < this.allOrder.length; i++) {
                totalPrice += this.allOrder[i].price * this.allOrder[i].amount
            }
            this.form.total_price = totalPrice;
            return totalPrice
        },

        hasErrors() {
            return Object.keys(this.errors).length;
        },

        dishesId() {
            const dishesIdArray = []
            if (localStorage.getItem('orders')) {
                JSON.parse(localStorage.getItem('orders')).forEach(dish => {
                    dishesIdArray.push(dish.id)
                })
            }
            this.form.dishes_id = dishesIdArray;
            return dishesIdArray
        },

        allAmountsArray() {
            const amountsArray = []
            this.allOrder.forEach(dish => {
                amountsArray.push(dish.amount)
            })
            this.form.amounts = amountsArray;
            return amountsArray
        },

        // dishesOrders() {
        //     const dishesOrders = []
        //     for (let i = 0; i < dishes_id.length; i++) {
        //         const dishOrder = {dish_id: };

        //     }
        // }

    },
    mounted() {
        store.restaurantDetailsId = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders'))[0].restaurant_id : store.current_restaurant_id;
        console.log(store.restaurantDetailsId);
    }
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <div class="container mt-5 h-100">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Il tuo carrello</h1>

            <!-- buttons to come back -->
            <router-link v-if="store.restaurantDetailsId >= 1" :to="{ path: '/Restaurants/' + store.restaurantDetailsId }"
                class="btn btn-custom-secondary"><i class="fa-solid fa-reply me-2"></i>
                Torna al ristorante
            </router-link>

            <router-link v-if="store.restaurantDetailsId < 1" :to="{ name: 'home' }" class="btn btn-custom-secondary">
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
                    Prezzo Totale: <b>€{{ totalPrice }}</b>
                </span>

                <!-- <a href="http://127.0.0.1:8000/payments" class="btn btn-custom-secondary">Completa ordine</a> -->

            </div>
        </div>

        <h4 class="mt-4" v-if="allOrder.length">Infomazioni di consegna</h4>
        <form @submit.prevent="sendCustomerForm" novalidate v-if="allOrder.length" class="row">
            <div class="mb-3 col-6">
                <label for="customer_name" class="form-label">Nome</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.customer_name }" id="customer_name"
                    name="customer_name" v-model.trim="form.customer_name">
                <div class="invalid-feedback">
                    {{ errors.customer_name }}
                </div>
            </div>
            <div class="mb-3 col-6">
                <label for="customer_surname" class="form-label">Cognome</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.customer_surname }"
                    id="customer_surname" name="customer_surname" v-model.trim="form.customer_surname">
                <div class="invalid-feedback">
                    {{ errors.customer_surname }}
                </div>
            </div>
            <div class="mb-3 col-12">
                <label for="customer_address" class="form-label">Indirizzo</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.customer_address }"
                    id="customer_address" name="customer_address" v-model.trim="form.delivery_address">
                <div class="invalid-feedback">
                    {{ errors.delivery_address }}
                </div>
            </div>
            <div class="mb-3 col-6">
                <label for="customer_email" class="form-label">Indirizzo Email</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.customer_email }"
                    id="customer_email" name="customer_email" v-model.trim="form.customer_email">
                <div class="invalid-feedback">
                    {{ errors.customer_email }}
                </div>
            </div>
            <div class="mb-3 col-6">
                <label for="customer_phone_number" class="form-label">Numero di Telefono</label>
                <input type="tel" class="form-control" :class="{ 'is-invalid': errors.customer_phone_number }"
                    id="customer_phone_number" name="customer_phone_number" v-model.trim="form.customer_phone_number">
                <div class="invalid-feedback">
                    {{ errors.customer_phone_number }}
                </div>
            </div>

            <input type="hidden" v-model.trim="totalPrice">
            <input type="hidden" v-model.trim="dishesId">
            <input type="hidden" v-model.trim="allAmountsArray">

            <div class="d-flex justify-content-end mb-4">
                <button type="submit" class="btn btn-custom-secondary">Conferma dati</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
h1,
h4 {
    color: var(--d-blue);
}

.container {
    min-height: 75vh;
}

.custom-p {
    padding: 10px 20px;
}
</style>