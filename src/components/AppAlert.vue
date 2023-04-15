<script>
export default {
    name: 'AppAlert',
    props: { isLoading: Boolean, hasError: Boolean, isThereRestaurant: Boolean }
}
</script>

<template>
    <div class="container custom-size alert alert-warning my-5" v-if="hasError === true">
        <p>Mi dispiace, si è verificato un errore. Riaggiorna la pagina!</p>
    </div>
    <div class="container custom-size alert alert-warning my-5" v-if="isThereRestaurant === false">
        <p>Non ci sono risultati per questa ricerca.</p>
    </div>
</template>

<style lang="scss" scoped>
.custom-size {
    font-size: 2rem;
}
</style>