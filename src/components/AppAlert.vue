<script>
import { store } from '../data/store';
export default {
    name: 'AppAlert',
    data() {
        return {
            store
        }
    },
    props: { isLoading: Boolean, hasError: Boolean, isThereRestaurant: Boolean }
}
</script>

<template>
    <div class="container custom-size alert alert-warning my-5" v-if="hasError === true">
        <p>Mi dispiace, si è verificato un errore. Riaggiorna la pagina!</p>
    </div>
    <div class="container custom-size alert alert-warning my-5" v-if="store.isThereRestaurant === false">
        <p class="m-0">Non ci sono risultati per questa ricerca.</p>
    </div>
</template>

<style lang="scss" scoped>
.custom-size {
    font-size: 2rem;
}
</style>