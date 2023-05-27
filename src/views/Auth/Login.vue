<template>
    <div class="container u-full-height u-flex u-flex-col pt-4">
        <div class="mb-24">
            <h2 class="u-text-normal mb-12">Login</h2>

            <form @submit.prevent="onSubmit">
                <div class="form-group mr-12">
                    <label for="username">Email address <sup>*</sup></label>
                    <input
                        v-model="form.username"
                        class="form-control"
                        id="username"
                        type="email"
                        autocomplete="username"
                        autofocus
                        required
                    />
                </div>

                <div class="form-group mr-12">
                    <label for="password">Password <sup>*</sup></label>
                    <input
                        v-model="form.password"
                        class="form-control"
                        id="password"
                        type="password"
                        autocomplete="current-password"
                        required
                    />
                </div>

                <b-button type="submit" :is-loading="isLoading" variant="secondary">Login</b-button>
            </form>

            <p class="mt-4">
                Don't have an account?
                <router-link :to="{ name: 'SignUp' }" class="text-secondary">Sign up</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
    name: 'Login',

    components: { BButton },

    data () {
        return {
            isLoading: false,
            form: {
                username: '',
                password: '',
            },
        }
    },

    methods: {
        async onSubmit () {
            if (this.isLoading) return
            if (!this.formIsValid()) {
                this.$toast.open({ type: 'error', message: 'Please provide email and password.' })
                return
            }

            this.isLoading = true

            try {
                await this.$appwrite.account.createEmailSession(
                    this.form.username,
                    this.form.password,
                )

                const { $id, name } = await this.$appwrite.account.get()
                this.$store.commit('setUser', { id: $id, name })

                await this.$router.push({ name: 'Home' })
            } catch (e) {
                console.log(e)
                this.$toast.open({ type: 'error', message: e.message })
            } finally {
                this.isLoading = false
            }
        },

        formIsValid () {
            return !(!this.form.username || !this.form.password);
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
