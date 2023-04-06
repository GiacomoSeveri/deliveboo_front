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

        //funzione che viene eseguita quandon nello store viene cambiato l'array type_selected con nuovi campi
        has_type(lol) {



            //controllo se non sono selezionati  types e stampo tutti i ristoranti
            if (store.selected_types[0] == undefined) {
                return true
            }

            let variabile_fine_ciclo = false;
            let variabile_finale = false;
            let flag = true;
            store.selected_types.forEach((element, index) => {

                variabile_finale = false;

                //
                if (index != 0 && variabile_fine_ciclo) {
                    variabile_fine_ciclo = false;
                }


                const numero = lol.length - 1;

                //ciclo sugli indici dei tipi del singolo ristorante
                for (let i = 0; i < lol.length; i++) {

                    //controllo se il ciclo precedente (o se è il primo mi da true) ha dato risposta positiva
                    if (flag) {

                        //faccio il controllo sul singolo elemento
                        if (lol[i]['name'] == element) {
                            variabile_finale = true;

                            flag = true
                        }

                        if (i == numero) {

                            if (!variabile_finale) {
                                flag = false;
                            }

                        }
                    }


                }





            })

            if (variabile_finale) {
                return true

            } else {
                return false
            }

        }
    },

}
</script>

<template>
    <div class="col-lg-4 col-md-6 col-sm-12 my-3 questo" v-if="has_type(restaurant.types)">
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