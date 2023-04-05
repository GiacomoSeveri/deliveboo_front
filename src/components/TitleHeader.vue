<script>
export default {
    name: 'TitleHeader',
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center py-3 bg-custom-img">
        <h3 class="text-uppercase custom-text-title m-0">Taste you're favourite food, one "byte" at time</h3>
    </div>
</template>

<style lang="scss" scoped>
.bg-custom-img {
    background-image: url(img/noci.jpg);
    // object-fit: contain;
    background-size: cover;
}

@media screen and (max-width: 768px) {
    h3 {
        font-size: 20px;
        padding: 0 5px;
    }
}

@media screen and (max-width: 576px) {
    h3 {
        font-size: 15px;
    }
}
</style>
