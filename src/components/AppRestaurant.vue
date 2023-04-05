<script>
export default {
    name: 'AppRestaurant',
    props: { restaurant: Object }
}
</script>

<template>
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img :src="restaurant.image" class="card-img-top" :alt="restaurant.name">
            <div class="card-body">
                <h5 class="card-title">{{ restaurant.name }}</h5>
                <p class="card-text">{{ restaurant.description }}</p>
                <ul class="list-group list-group-flush">
                    <li v-for="res_type in restaurant.types" class="list-group-item">{{ res_type.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>