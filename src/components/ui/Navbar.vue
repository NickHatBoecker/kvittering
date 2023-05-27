<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand :to="{ name: 'Home' }">kvittering</b-navbar-brand>

        <template v-if="user">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        class="nav-link"
                        :active="$route.name === 'Home'"
                        :to="{ name: 'Home' }"
                    ><b-icon icon="files" aria-hidden="true" /> Documents</b-nav-item>
                    <b-nav-item
                        class="nav-link"
                        :active="$route.name === 'Trash'"
                        :to="{ name: 'Trash' }"
                    ><b-icon icon="trash" aria-hidden="true" /> Trash</b-nav-item>
                    <b-nav-item
                        class="nav-link"
                        @click="logout"
                    >Sign out</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </template>
    </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem } from 'bootstrap-vue'

export default {
    name: 'Navbar',

    components: { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem },

    computed: {
        user () {
            return this.$store.state.user
        },
    },

    methods: {
        async logout () {
            await this.$appwrite.account.deleteSessions()
            this.$store.commit('setUser', null)
            await this.$router.push({ name: 'Login' })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
