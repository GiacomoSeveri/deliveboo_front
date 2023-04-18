<script>
import axios from 'axios';
const apiUrlRestaurants = 'http://127.0.0.1:8000/api/restaurants';
const apiUrlTypes = 'http://127.0.0.1:8000/api/types';
const apiUrlDishes = 'http://127.0.0.1:8000/api/Dishes';

import AppMotion from '../components/AppMotion.vue';
import AppHeader from '../components/AppHeader.vue';
import AppAlert from '../components/AppAlert.vue';
import ImgCarousel from '../components/ImgCarousel.vue';
import SerchBar from '../components/SerchBar.vue';
import CheckBoxCard from '../components/CheckBoxCard.vue';
import AppRestaurant from '../components/AppRestaurant.vue';

import { store } from '../data/store';
export default {
    name: 'App',
    components: { AppMotion, AppHeader, SerchBar, ImgCarousel, CheckBoxCard, AppAlert, AppRestaurant },
    data() {
        return {
            res_types: [],
            restaurants: [],
            checked: [],
            filteredRestaurants: [],
            nameFilter: '',
            store,
            isLoading: false,
            hasError: false,
        }
    },
    methods: {
        fetchTypes() {
            this.isLoading = true;
            axios.get(apiUrlTypes)
                .then(res => { this.res_types = res.data })
                .catch(err => { this.hasError = true })
                .then(() => { this.isLoading = false });
        },
        fetchRestaurants() {
            this.isLoading = true;
            axios.get(apiUrlRestaurants)
                .then(res => {
                    this.restaurants = res.data;
                    this.filteredRestaurants = res.data;
                })
                .catch(err => { this.hasError = true })
                .then(() => { this.isLoading = false; });
        },
        fetchDishes() {
            axios.get(apiUrlDishes)
                .then(res => { this.Dishes = res.data })
                .catch(err => { this.hasError = true })
                .then(() => { this.isLoading = false });
        },
        checkedValue(value) {
            if (store.selected_types.includes(value)) {
                console.log('A')
                let contain = false
                store.selected_types.forEach((single_type, i) => {
                    //se il value è contenuto nello store selected_type lo tolgo
                    if (single_type == value) {
                        console.log('B')
                        store.selected_types.splice(i, 1);
                        console.log(store.selected_types);
                        contain = true
                    }
                });
                if (contain) return
                store.selected_types.push(value);
                console.log(store.selected_types)
                console.log('C')
            }
            store.selected_types.push(value);
            console.log('D')

            // console.log('quetso =>', store.selected_types[store.selected_types.length - 1])
        },
        onTextChange(text) {
            this.nameFilter = text;
        },
        searchRestaurant() {
            if (this.nameFilter === '') {
                store.isThereRestaurant = true;
                this.filteredRestaurants = this.restaurants;
                console.log('1')
            } else {
                this.filteredRestaurants = this.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
                this.filteredRestaurants.length ? store.isThereRestaurant = true : store.isThereRestaurant = false;
            }



            // if (this.nameFilter.length) {
            //     this.filteredRestaurants = this.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
            // } else {
            //     this.filteredRestaurants = this.restaurants;
            // }
        },

        clearFilterType() {
            store.selected_types = []
            return
        },

    },
    created() {
        this.fetchTypes();
        this.fetchRestaurants();
        this.clearFilterType();
    }
}
</script>

<template>
    <!-- <AppMotion /> -->

    <!-- loader -->
    <AppLoader v-if="isLoading" />

    <!-- slider -->
    <ImgCarousel />

    <!-- Search bar -->
    <SerchBar @search="searchRestaurant" @text-change="onTextChange" />

    <!-- Types of restaurants -->
    <div class="container">
        <div class="row">

            <form action="" class="d-flex justify-content-center align-items-center flex-wrap">
                <CheckBoxCard v-for="res_type in res_types" :res_type="res_type" @check-value="checkedValue" />
            </form>

            <!-- Alert Messages -->
            <AppAlert :isLoading="isLoading" :hasError="hasError" :isThereRestaurant="store.isThereRestaurant" />

            <!-- Restaurants -->
            <div id="restaurants" class="row">
                <AppRestaurant v-for="restaurant in filteredRestaurants" :restaurant="restaurant" />
            </div>

        </div>
    </div>
</template> 

<style lang="scss">
.width-alert {
    width: 63%;
    margin: 0 auto;
}
</style>
