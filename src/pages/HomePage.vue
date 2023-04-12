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
            store
        }
    },
    methods: {
        fetchTypes() {
            axios.get(apiUrlTypes).then(res => { this.res_types = res.data })
        },
        fetchRestaurants() {
            axios.get(apiUrlRestaurants).then(res => {
                this.restaurants = res.data;
                this.filteredRestaurants = res.data;
            })
        },
        fetchDishes() {
            axios.get(apiUrlDishes).then(res => { this.Dishes = res.data })
        },
        checkedValue(value) {
            if (store.selected_types.includes(value)) {

                let contain = false
                store.selected_types.forEach((single_type, i) => {
                    //se il value è contenuto nello store selected_type lo tolgo
                    if (single_type == value) {
                        store.selected_types.splice(i, 1);
                        console.log(store.selected_types);
                        contain = true
                    }
                });
                if (contain) return
                store.selected_types.push(value);
                console.log(store.selected_types)
            }
            store.selected_types.push(value);
            // console.log('quetso =>', store.selected_types[store.selected_types.length - 1])
        },
        onTextChange(text) {
            this.nameFilter = text;
        },
        searchRestaurant() {
            if (this.nameFilter === '') {
                this.filteredRestaurants = this.restaurants;
            } else {
                this.filteredRestaurants = this.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
            }



            // if (this.nameFilter.length) {
            //     this.filteredRestaurants = this.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
            // } else {
            //     this.filteredRestaurants = this.restaurants;
            // }
        },


    },

    created() {
        this.fetchTypes();
        this.fetchRestaurants();
    }
}
</script>

<template>
    <ImgCarousel />
    <SerchBar @search="searchRestaurant" @text-change="onTextChange" />

    <div class="container">
        <form action="" class="d-flex justify-content-center align-items-center flex-wrap">
            <CheckBoxCard v-for="res_type in res_types" :key="id" :res_type="res_type" @check-value="checkedValue" />
        </form>
        <div class="row mt-5">
            <AppAlert v-if="!filteredRestaurants.length" />
            <AppRestaurant v-for="restaurant in filteredRestaurants" :key="id" :restaurant="restaurant" />
        </div>

    </div>
</template> 

<style lang="scss"></style>
