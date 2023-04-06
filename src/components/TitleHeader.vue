<script>
export default {
    name: 'TitleHeader',
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center py-3 bg-custom-img">
        <h3 class="text-uppercase custom-text-title m-0">slider</h3>
    </div>
</template>

<style lang="scss" scoped>
.bg-custom-img {
    background-image: url(img/sfondo.jpg);
    // object-fit: contain;
    background-position: center;
    background-size: cover;
    min-height: 350px;
}

.custom-text-title {
    text-shadow: 1px 1px var(--bgc);
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
