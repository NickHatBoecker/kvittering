<template>
    <div class="container u-full-height u-flex u-flex-col pt-4">
        <div class="mb-24">
            <h2 class="u-text-normal mb-12">Sign up</h2>

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
                        autocomplete="new-password"
                        required
                    />
                    <small class="text-muted">Must be at least 8 characters</small>
                </div>

                <div class="form-group mr-12">
                    <label for="password">Repeat password <sup>*</sup></label>
                    <input
                        v-model="form.repeatPassword"
                        class="form-control"
                        id="repeatPassword"
                        type="password"
                        autocomplete="new-password"
                        required
                    />
                </div>

                <b-button type="submit" :is-loading="isLoading" variant="secondary">Sign up</b-button>
            </form>

            <p class="mt-4">
                Already have an account?
                <router-link :to="{ name: 'Login' }" class="text-secondary">Log in</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { ID } from 'appwrite'
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
                repeatPassword: '',
            },
        }
    },

    methods: {
        async onSubmit () {
            if (this.isLoading) return
            if (!this.form.username || !this.form.password || !this.form.repeatPassword) {
                this.$toast.open({ type: 'error', message: 'Please provide email and password.' })
                return
            }
            if (this.form.password !== this.form.repeatPassword) {
                this.$toast.open({ type: 'error', message: 'Passwords do not match.' })
                return
            }

            this.isLoading = true

            try {
                await this.$appwrite.account.create(
                    ID.unique(),
                    this.form.username,
                    this.form.password,
                )
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
    },
}
</script>

<style lang="scss" scoped>
</style>
