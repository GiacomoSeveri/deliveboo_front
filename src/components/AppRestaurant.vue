<script>
export default {
    name: 'AppRestaurant',
    props: { restaurant: Object }
}
</script>

<template>
    <div class="col-4 my-3">
        <div class="card">
            <img :src="restaurant.image" class="img-fluid img-res-custom" :alt="restaurant.name">
            <div class="card-body">
                <h3 class="card-title custom-text-title">{{ restaurant.name }}</h3>
                <p class="card-text p-card">{{ restaurant.description }}</p>
                <!-- <ul class="list-group list-group-flush"> -->
                <span v-for="res_type in restaurant.types" class="me-3 text-custom-secondary">{{ res_type.name }}</span>
                <!-- </ul> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.img-res-custom {
    height: 250px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
}

p {
    overflow: hidden;
    // line-height: 2rem;
    // max-height: 8rem;
    -webkit-box-orient: vertical;
    // display: block;
    display: -webkit-box;
    // overflow: hidden !important;
    // text-overflow: ellipsis;
    -webkit-line-clamp: 2;
}

.p-card {
    min-height: 48px;
}
</style>