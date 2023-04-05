<script>
import axios from 'axios';
const apiUrlRestaurants = 'http://127.0.0.1:8000/api/restaurants'
const apiUrlTypes = 'http://127.0.0.1:8000/api/types'

import AppHeader from './components/AppHeader.vue'
import TitleHeader from './components/TitleHeader.vue'
import SerchBar from './components/SerchBar.vue'
import CheckBoxCard from './components/CheckBoxCard.vue'
import AppRestaurant from './components/AppRestaurant.vue'
export default {
    name: 'App',
    components: { AppHeader, TitleHeader, SerchBar, CheckBoxCard, AppRestaurant },
    data() {
        return {
            res_types: [],
            restaurants: [],
            checked: []
        }
    },
    methods: {
        fetchTypes() {
            axios.get(apiUrlTypes).then(res => { this.res_types = res.data })
        },
        fetchRestaurants() {
            axios.get(apiUrlRestaurants).then(res => { this.restaurants = res.data })
        },
        checkedValue(value) {
            if (value != this.restaurants.types) {
                this.restaurants
            }
        }

    },
    computed: {
        // checkedTypes(){
        //     return
        // }
    },
    created() {
        this.fetchTypes();
        this.fetchRestaurants();
    }
}
</script>

<template>
    <AppHeader />
    <TitleHeader />
    <SerchBar />
    <div class="container">
        <form action="" class="d-flex justify-content-between align-items-center">
            <CheckBoxCard v-for="res_type in res_types" :key="id" :res_type="res_type" @check-value="checkedValue" />
        </form>
        <div class="row mt-5">
            <AppRestaurant v-for="restaurant in restaurants" :key="id" :restaurant="restaurant" />
        </div>
    </div>
</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>
