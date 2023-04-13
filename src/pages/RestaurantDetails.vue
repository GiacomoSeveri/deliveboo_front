<script>
import axios from 'axios';
const apiUrlRestaurant = 'http://127.0.0.1:8000/api/restaurants/';
const apiUrlType = 'http://127.0.0.1:8000/api/types/';
const apiUrlDish = 'http://127.0.0.1:8000/api/dishes/';
export default {
    name: 'RestaurantDetails',
    props: { res_type: Object },
    data() {
        return {
            restaurant: {},
            dishes: [],
            restaurant_dishes: [],
        }
    },
    methods: {
        fetchRestaurant() {
            axios.get(apiUrlRestaurant + this.$route.params.id).then(res => {
                this.restaurant = res.data;
            })
        },
        fetchType() {
            axios.get(apiUrlType + this.$route.params.id).then(res => {
                this.res_type = res.data;
                // console.log(res_type);
            })
        },
        fetchDish() {
            axios.get(apiUrlDish).then(res => {
                this.dishes = res.data;
                this.dishes.forEach(dish => {
                    if (this.$route.params.id == dish.restaurant_id) {
                        this.restaurant_dishes.push(dish)
                    }
                });
            })
        },
    },
    created() {
        this.fetchRestaurant();
        this.fetchDish()
        // // this.fetchType();
    }
}
</script>

<template>
    <img :src="restaurant.image" class="img-res" :alt="restaurant.name">
    <div class="container my-5 custom-pos text-center">
        <h1 class="">{{ restaurant.name }}</h1>
    </div>
    <div class="container carte pb-2">
        <p>{{ restaurant.description }}</p>
        <div class="card border-0 p-3 my-4">
            <div class="card my-2 d-flex" v-for="dish in restaurant_dishes">
                <div class="d-flex justify-content-between">
                    <div class="p-3">
                        <h2 class="p-0 custom-text-title">{{ dish["name"] }}</h2>
                        <p class="mb-5 p-0 fs-5">{{ dish["description"] }}</p>
                        <div class="d-flex justify-content-start align-items-center">
                            <p class="m-0 mt-1 p-0 text-custom-secondary">{{ dish["price"] }}€</p>
                            <input type="number" min="0" max="99" placeholder="0" step="1" class="mx-3 mt-1">
                            <a href="" class="btn btn-custom-secondary d-flex align-items-center"><i
                                    class="fa-solid fa-cart-plus fs-4"></i></a>
                        </div>
                    </div>
                    <img :src="dish.image" class="img-dish img-fluid" :alt="dish.name">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
