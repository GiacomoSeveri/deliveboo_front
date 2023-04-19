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
    <RouterView />
    <AppFooter />
</template> 

<style lang="scss">
@use './assets/scss/style.scss';
</style>
