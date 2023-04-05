<script>
import AppHeader from './components/AppHeader.vue'
import TitleHeader from './components/TitleHeader.vue'
import SerchBar from './components/SerchBar.vue'
import CheckBocCard from './components/CheckBoxCard.vue'
export default {
    name: 'App',
    components: { AppHeader, TitleHeader, SerchBar, CheckBocCard }
}
</script>

<template>
    <AppHeader />
    <TitleHeader />
    <SerchBar />
    <CheckBocCard />
</template>

<style lang="scss">
@use './assets/scss/style.scss';
</style>
