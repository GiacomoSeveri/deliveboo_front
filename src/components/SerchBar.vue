<script>
export default {
    name: 'SerchBar',
    data() { return { searchedText: '' } },
    emits: ['text-change', 'search']
}
</script>

<template>
    <form class="container" @submit.prevent="$emit('search')">
        <div class="width-bar position-relative my-5">
            <input id="dish-search" v-model.trim='searchedText' @keyup="$emit('text-change', searchedText)" type="text"
                placeholder="Cerca per nome ristorante" autocomplete="off" class="c-searchInput">
            <i class="fa-solid fa-magnifying-glass position-glass" style="color: #4888a8;"></i>
        </div>
    </form>
</template>

<style lang="scss" scoped>
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
