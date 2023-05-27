import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Appwrite from '@/assets/appwrite'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import VueDateFns from 'vue-date-fns'
import { IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false
Vue.prototype.$appwrite = Appwrite

Vue.use(ToastPlugin)
Vue.use(VueDateFns)
Vue.use(IconsPlugin)

new Vue({
    router,
    store,
    beforeCreate() {
        this.$store.dispatch('init')
    },
    render: h => h(App),
}).$mount('#app')
