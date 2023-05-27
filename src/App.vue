<template>
    <div id="app">
        <navbar />
        <router-view/>
    </div>
</template>

<script>
import Navbar from '@/components/ui/Navbar.vue'

export default {
    components: { Navbar },
}
</script>

<style lang="scss">
@import './assets/css/main.scss';
</style>
