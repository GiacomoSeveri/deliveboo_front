<script>
import axios from 'axios';
const apiUrlRestaurant = 'http://127.0.0.1:8000/api/restaurants/';
export default {
    name: 'RestaurantDetails',
    data() {
        return {
            restaurant: {},
        }
    },
    methods: {
        fetchRestaurant() {
            axios.get(apiUrlRestaurant + this.$route.params.id).then(res => {
                this.restaurant = res.data
            })
        },
    },
    created() {
        this.fetchRestaurant();
        console.log(this.restaurant);
    }
}
</script>

<template>
    <h1>ciao {{ restaurant.id }}</h1>
</template>

<style lang="scss">
// @use './assets/scss/style.scss';
</style>
