<script>
import axios from 'axios';
import { store } from '../data/store';
export default {
    name: 'CheckBoxCard',
    data() {
        return {
            store,
        }
    },
    props: { res_type: Object },
    methods: {
        isChecked() {
            for (let i = 0; i < store.selected_types.length; i++) {
                selected_types[i] === true;
            }
        }
    }
}
</script>

<template>
    <div class=" d-flex align-items-center mb-3">


        <div class="type mx-3 d-flex justify-content-center flex-column align-items-center border-custom">
            <input @click="$emit('check-value', res_type.name)" v-model="isChecked" type="checkbox" class="btn-check"
                :id="res_type.id" autocomplete="off">
            <label
                class="btn btn-custom d-flex align-items-center justify-content-center size border-0 p-0 w-100 overflow-y-hidden"
                :for="res_type.id">
                <img class="w-100" :src="res_type.image" :alt="res_type.name">
            </label>
            <label class="btn btn-custom d-flex align-items-center justify-content-center size border-0 p-0"
                :for="res_type.id">
                <p class="mb-0" type="button">{{ res_type.name }}</p>
            </label>
        </div>


    </div>
</template>

<style lang="scss" scoped>
.type:hover {
    box-shadow: 0 2px 5px 2px rgba(153, 182, 196, 0.5);
    transform: scale(1.05, 1.05);
    transition: 0.1s ease
}

input {
    width: 10px;
    height: 10px;
}

.border-custom {
    width: 110px;
    height: 135px;
    // border: solid 2px var(--l-blue);
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);

    border-radius: 15px;
    overflow: hidden;
}

.size {
    width: 80px;
    height: 80px;
    font-size: 50px;
}

p {
    font-weight: 600;
    font-size: 17px;
    color: var(--d-blue);
    transition: all 0.1s;
    margin-top: 1.3rem;
}

i {
    color: var(--d-blue);
    transition: all 0.1s;
}

label {
    width: 100%;
    height: 50%;
}


input:checked~label {

    i,
    p {
        color: var(--p-orange);
    }


}
</style>
