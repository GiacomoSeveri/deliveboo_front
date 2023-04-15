<script>
export default {
    name: 'AppAlert',
    props: { isLoading: Boolean, hasError: Boolean, filteredRestaurants: Array }
}
</script>
<template>
    <div class="container custom-size alert alert-warning mt-5" v-if="hasError">
        <p>Mi dispiace, si è verificato un errore. Riaggiorna la pagina!</p>
    </div>
    <div class="container custom-size alert alert-warning mt-5" v-if="!filteredRestaurants.length && !hasError"> Non ci
        sono
        risultati per
        questa ricerca.
    </div>
</template>
<style lang="scss" scoped>
.custom-size {
    font-size: 2rem;
}
</style>