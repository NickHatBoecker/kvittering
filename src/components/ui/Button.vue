<template>
    <button
        ref="button"
        class="button"
        :class="`button--${theme} button--size-${size}${disabled ? ' disabled' : ''}`"
        :type="type"
        :style="buttonStyle"
        :disabled="disabled ? 'true' : undefined"
    >
        <spinner v-if="isLoading" />
        <slot v-else />
    </button>
</template>

<script>
import Spinner from '@/components/ui/Spinner.vue'

const buttonThemes = ['primary', 'default', 'highlight']

export default {
    name: 'Button',

    components: { Spinner },

    props: {
        theme: { type: String, default: 'primary', validator: val => buttonThemes.includes(val) },
        size: { type: String, default: 'default', validator: val => ['default', 'small'].includes(val) },
        disabled: { type: Boolean, default: false },
        isLoading: { type: Boolean, default: false },
        type: { type: String, default: 'button' },
    },

    data: () => ({ buttonWidth: 0, buttonHeight: 0 }),

    computed: {
        buttonStyle () {
            if (!this.buttonWidth && !this.buttonHeight) return undefined

            return {
                height: `${this.buttonHeight}px`,
                width: `${this.buttonWidth}px`,
            }
        },
    },

    watch: {
        /**
         * Make sure that button width stays the same while loading
         */
        isLoading () {
            if (this.isLoading) {
                this.buttonHeight = this.$refs.button.offsetHeight || 0
                this.buttonWidth = this.$refs.button.offsetWidth || 0
            } else {
                this.buttonHeight = 0
                this.buttonWidth = 0
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
