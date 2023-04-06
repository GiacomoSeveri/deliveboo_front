<script>
import { store } from '../data/store'
export default {
    name: 'AppRestaurant',
    props: { restaurant: Object },
    data() {
        return {
            store
        }
    },


    methods: {

        has_type(lol) {

            //funzione che viene eseguita quandon nello store viene cambiato l'array
            //type_selected con nuovi campi


            //controllo se non sono selezionati  types

            if (store.selected_types[0] == undefined) {
                return true
            }
            let variabile = false;
            let variabile_fine_ciclo = false;
            //store.selected_types.forEach((element, index) => {
            //    console.log('selected element =>', element);
            //    lol.forEach((lol_element, lol_index) => {
            //        console.log('selected elemente =>', element);
            //
            //   })
            //})
            if (store.selected_types[0] === lol[0].name) {
                console.log('passato')
                return true
            }

            // esegue la funzione search_type(con parametro il ristorante)

            return false
        }
    },

}
</script>

<template>
    <div class="col-4 my-3 questo" v-if="has_type(restaurant.types)">
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