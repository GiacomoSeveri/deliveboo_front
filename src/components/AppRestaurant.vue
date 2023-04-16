<script>
import { store } from '../data/store'
export default {
    name: 'AppRestaurant',
    props: { restaurant: Object, message: String },
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

            let variabile_finale = false;
            let flag = true;
            store.selected_types.forEach((element) => {

                variabile_finale = false;

                const numero_lunghezza_input = lol.length - 1;

                //ciclo sugli indici dei tipi del singolo ristorante
                for (let i = 0; i < lol.length; i++) {

                    //controllo se il ciclo precedente (o se è il primo mi da true) ha dato risposta positiva
                    if (flag) {

                        //faccio il controllo sul singolo elemento
                        if (lol[i]['name'] == element) {
                            variabile_finale = true;
                            flag = true
                        }

                        //alla fine del ciclo se NON sono stati trovati gli elementi nell'if precedente cambio il flag in modo tale da non ripetere l'operazione sugli altri tipi
                        if (i == numero_lunghezza_input && !variabile_finale) {
                            flag = false;
                        }
                    }
                }
            })

            return variabile_finale
        }
    },

}
</script>

<template>
    <div class="col-lg-4 col-md-6 col-sm-12 my-3" v-if="has_type(restaurant.types)">
        <router-link :to="{ name: 'Restaurant-details', params: { id: restaurant.id } }"
            class="text-decoration-none text-dark">

            <div class="card cs-card p-relative">
                <img :src="restaurant.image" class="img-fluid img-res-custom" :alt="restaurant.name">
                <div class="card-body">
                    <h3 class="card-title custom-text-title">{{ restaurant.name }}</h3>
                    <p class="card-text p-card">{{ restaurant.description }}</p>
                    <!-- <ul class="list-group list-group-flush"> -->
                    <span v-for="res_type in restaurant.types" class="me-3 text-custom-secondary">{{ res_type.name }}</span>
                    <!-- </ul> -->
                </div>

                <!-- label -->
                <div v-if="store.current_restaurant_id === restaurant.id" class="label">
                    <i class="fa-star fa-solid custom-bg-titolone"></i>
                    <span><b> Ristorante Scelto</b></span>
                </div>

            </div>

        </router-link>

    </div>
</template>

<style lang="scss" scoped>
.label {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    position: absolute;
    top: 15px;
    left: 15px;
}

.cs-card {
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
}


.cs-card:hover {
    box-shadow: 0 2px 5px 3px rgba(153, 182, 196, 0.5);
    transform: translateY(-2%);
    transition: 0.1s ease;
}


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