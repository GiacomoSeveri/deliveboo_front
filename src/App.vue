<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppMotion from './components/AppMotion.vue';
export default {
    name: 'App',
    components: { AppHeader, AppFooter, AppMotion },
}
</script>

<template>
    <AppMotion />
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
