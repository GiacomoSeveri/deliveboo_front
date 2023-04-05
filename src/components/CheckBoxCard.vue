<script>
export default {
    name: 'CheckBocCard',
}
</script>

<template>
    <form action="">
        <div class="mx-5 d-flex justify-content-center flex-column align-items-center border-custom">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
            <label class="btn btn-custom d-flex align-items-center justify-content-center ciao border-0 pb-1 pt-3"
                for="btncheck1"><i class="fa-solid fa-pizza-slice"></i>
            </label>
            <label class="btn btn-custom d-flex align-items-center justify-content-center ciao border-0 p-0"
            for="btncheck1">
            <p class="m-0 text-uppercase" type="button">italiano</p>
        </label>
    </div>
    </form>
    <!-- <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox"> -->
</template>

<style lang="scss" scoped>
.border-custom {
    width: 115px;
    height: 115px;
    border: solid 2px var(--l-blue);
    border-radius: 15px;
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



input:checked~label {

    i,
    p {
        color: var(--p-orange);
    }


}
</style>
