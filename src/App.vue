<template>
    <div id="app" class="pb-100">
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

body {
    background-image: url("~@/assets/page-pattern.png");
}
</style>
