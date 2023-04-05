<script>
import axios from 'axios';
export default {
    name: 'CheckBoxCard',
    props: { res_type: Object },
    methods: {

    }
}
</script>

<template>
    <div class="mx-5 d-flex justify-content-center flex-column align-items-center border-custom">
        <input @click="$emit('check-value', res_type.name)" type="checkbox" class="btn-check" :id="res_type.id"
            autocomplete="off">
        <label
            class="btn btn-custom d-flex align-items-center justify-content-center ciao border-0 p-0 w-100 overflow-y-hidden"
            :for="res_type.id">
            <img class="w-100" :src="res_type.image" :alt="res_type.name">
        </label>
        <label class="btn btn-custom d-flex align-items-center justify-content-center ciao border-0 p-0" :for="res_type.id">
            <p class="m-0 text-uppercase" type="button">{{ res_type.name }}</p>
        </label>
    </div>
</template>

<style lang="scss" scoped>
input {
    width: 10px;
    height: 10px;
}

.border-custom {
    width: 145px;
    height: 145px;
    border: solid 2px var(--l-blue);
    border-radius: 15px;
    overflow: hidden;
}

.ciao {
    width: 80px;
    height: 80px;
    font-size: 50px;
}

p {
    font-weight: 600;
    font-size: 20px;
    color: var(--d-blue);
    transition: all 0.1s;
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
