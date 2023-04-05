<script>
export default {
    name: 'SerchBar',
}
</script>

<template>
    <div class="container">

        <div class="d-flex justify-content-end my-5 fs-5">
            <form class="">
                <input class="text-custom-secondary border-c" type="text" placeholder="cercaRistorante()">
                <button class="border-c" type="submit"><i class="fa fa-search custom-text-title"></i></button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.border-c {
    border: 2px solid var(--d-blue);
}
</style>
