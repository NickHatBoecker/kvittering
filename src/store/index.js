import Vue from 'vue'
import Vuex from 'vuex'
import appwrite from '@/assets/appwrite'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // { id: '', name: '' }
        user: null,
    },

    mutations: {
        setUser (s, payload) {
            s.user = payload
        },
    },

    actions: {
        async init ({ commit }) {
            try {
                const {$id, name} = await appwrite.account.get()
                commit('setUser', {id: $id, name})
            } catch (e) {
                // Do nothing. User is probably not logged in.
            }
        },
    },

    getters: {
        isAuthenticated: s => s.user !== null,
    },
})
