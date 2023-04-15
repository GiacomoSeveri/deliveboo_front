<script>
export default {
    name: 'SerchBar',
    data() { return { searchedText: '' } },
    emits: ['text-change', 'search']
}
</script>

<template>
    <form class="container" @submit.prevent="$emit('search')">
        <div class="width-bar position-relative input-group my-5">
            <input class="c-searchInput form-control" id="dish-search" v-model.trim='searchedText'
                @keyup="$emit('text-change', searchedText)" type="text" placeholder="Cerca per nome ristorante"
                autocomplete="off">
            <i class="fa-solid fa-magnifying-glass position-glass" style="color: #4888a8;"></i>
            <button class="btn btn-custom-secondary">Cerca</button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
i {
    z-index: 5;
}

button.btn {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
}

button.btn:hover {
    box-shadow: 0 0 0 2px rgba(255, 131, 48, 0.6);
}

.form-control:focus {
    box-shadow: 0 0 0 2px rgba(255, 131, 48, 0.6);
    z-index: 0;
}

.c-searchInput {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
    // box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
    padding: 17px 55px 16px 50px;
    // position: relative;
    border-radius: 15px;
    // font-family: JetSansDigital, Arial, sans-serif;
    font-weight: 400;
    color: var(--d-blue);
    background: var(--bgc);
    border: 0;
    // outline: 0;
    width: 100%;
    // -webkit-appearance: none;
    font-size: 16px;
    font-size: 1rem;
    padding: 16px 60px;
}

input:focus-visible {

    outline-color: var(--p-orange);


}

.position-relative {
    position: relative;
}

.position-glass {
    position: absolute;
    bottom: 50%;
    transform: translate(0px, 50%);
    left: 2%;
    font-size: 22px;
}

.width-bar {
    width: 63%;
    margin: 0 auto;
}
</style>
