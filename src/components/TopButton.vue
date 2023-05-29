<template>
    <div class="u-text-center pb-24">
        <b-button
            v-if="show"
            class="top-button text-white"
            title="To top"
            variant="secondary"
            v-scroll-to="'#top'"
        >
            <b-icon icon="chevron-up" class="text-white" aria-hidden="true" />
        </b-button>
    </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
    name: 'TopButton',

    components: { BButton },

    data: () => ({ show: false }),

    mounted () {
        window.addEventListener('scroll', this.onScroll)
    },

    destroyed () {
        window.addEventListener('scroll', this.onScroll)
    },

    methods: {
        onScroll () {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

            this.show = scrollTop > 1000
        },
    },
}
</script>

<style lang="scss" scoped>
.top-button {
    margin: auto;
    border-radius: 50%;
}
</style>
