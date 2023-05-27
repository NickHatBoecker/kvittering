import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import appwrite from '@/assets/appwrite'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "sign-up" */ '../views/Auth/SignUp.vue'),
    },
    {
        path: '/trash',
        name: 'Trash',
        component: () => import(/* webpackChunkName: "trash" */ '../views/Trash.vue'),
        meta: { requiresAuth: true },
    },
]

const router = new VueRouter({
    routes,
})

router.beforeEach(async (to, from, next) => {
    let isAuthenticated = false

    try {
        isAuthenticated = await appwrite.account.get()
    } catch (e) {
        // Do nothing. User is probably not logged in.
    }

    if (to.meta?.requiresAuth && !isAuthenticated) {
        next('login')
    }

    if (to.name === 'Login' && isAuthenticated) {
        next('/')
    }

    next()
})

export default router
