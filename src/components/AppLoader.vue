<script>
export default {
    name: 'AppLoader',
}
</script>



<template>
    <div class="spinner-container d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
        </div>
    </div>
</template>



<style scoped lang="scss">
.spinner-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 5;
}

.spinner-border {
    height: 200px;
    width: 200px;
    color: white;
    z-index: 1;
}
</style>