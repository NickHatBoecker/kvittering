<template>
    <div id="app" class="pb-100">
        <navbar />

        <div id="top">
            <router-view/>
        </div>

        <top-button />
    </div>
</template>

<script>
import Navbar from '@/components/ui/Navbar.vue'
import TopButton from '@/components/TopButton.vue'

export default {
    components: { TopButton, Navbar },
}
</script>

<style lang="scss">
@import './assets/css/main.scss';

body {
    background-image: url("~@/assets/page-pattern.png");
}
</style>
