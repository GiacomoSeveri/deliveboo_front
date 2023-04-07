<script>
export default {
    name: 'SerchBar',
}
</script>

<template>
    <div class="container w-100">
        <div class="w-100">
            <div class="d-flex justify-content-center align-items-center my-5 fs-5 w-100">
                <input id="dish-search" type="search" placeholder="Cerca per cucina o ristorante" autocomplete="off"
                    class="c-searchInput">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.c-searchInput {
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
    // box-shadow: 0 2px 5px 1px rgb(0 0 0 / 10%);
    padding: 17px 55px 16px 50px;
}

.c-searchInput {
    // position: relative;
    border-radius: 50rem;
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
    padding: 16px 30px 16px 30px;
    width: 63%;
}

input:focus-visible {

    outline-color: var(--p-orange);


}
</style>
