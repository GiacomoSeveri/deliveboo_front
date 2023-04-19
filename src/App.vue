<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
    name: 'App',
    components: { AppHeader, AppFooter },
}
</script>

<template>
    <!-- <AppMotion /> -->
    <AppHeader />
    <div class="heigth">
        <RouterView />
    </div>
    <AppFooter />
</template> 

<style lang="scss">
@use './assets/scss/style.scss';

.heigth {
    min-height: 100vh;
}
</style>
