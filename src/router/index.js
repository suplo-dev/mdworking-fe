import {createRouter, createWebHistory, RouterView} from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";
import { getActivePinia } from "pinia"
import {usePermission} from "@/composables/usePermission.js";

const {permission} = usePermission()

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/Home.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
        {
            path: '/news',
            name: 'news',
            component: () => import('../views/Home.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
        {
            path: '/network',
            name: 'network',
            component: () => import('../views/Home.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
        {
            path: '/career',
            name: 'career',
            component: () => import('../views/Home.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue'),
            meta: {
                auth: true,
                permissions: [],
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/profile.vue'),
            meta: {
                auth: true,
                permissions: [],
            },
        },
        {
            path: '/user',
            component: RouterView,
            children: [
                {
                    path: '',
                    name: 'user',
                    component: () => import('../views/user/index.vue'),
                    meta: {
                        auth: true,
                        permissions: [permission.user.value.view.value]
                    },
                },
                {
                    path: 'add',
                    name: 'user.add',
                    component: () => import('../views/user/add.vue'),
                    meta: {
                        auth: true,
                        permissions: [permission.user.value.add.value]
                    },
                },
                {
                    path: ':id',
                    name: 'user.edit',
                    component: () => import('../views/user/edit.vue'),
                    meta: {
                        auth: true,
                        permissions: [permission.user.value.update.value]
                    },
                },
            ],
        },
        {
            path: '/advertisement',
            name: 'advertisement',
            component: RouterView,
            children: [
                {
                    path: 'facebook',
                    component: RouterView,
                    children: [
                        {
                            path: '',
                            name: 'advertisement.facebook',
                            component: () => import('../views/advertisement/facebook/index.vue'),
                            meta: {
                                auth: true,
                                permissions: [permission.advertisement.value.facebook.value.view.value]
                            },
                        },
                        {
                            path: 'add',
                            name: 'advertisement.facebook.add',
                            component: () => import('../views/advertisement/facebook/add.vue'),
                            meta: {
                                auth: true,
                                permissions: [permission.advertisement.value.facebook.value.add.value]
                            },
                        },
                    ],
                },
                {
                    path: 'google',
                    component: RouterView,
                    children: [
                        {
                            path: '',
                            name: 'advertisement.google',
                            component: () => import('../views/campaign/google/index.vue'),
                            meta: {
                                auth: true,
                                permissions: [permission.advertisement.value.google.value.view.value]
                            },
                        },
                        {
                            path: 'add',
                            name: 'advertisement.google.add',
                            component: () => import('../views/campaign/google/add.vue'),
                            meta: {
                                auth: true,
                                permissions: [permission.advertisement.value.google.value.add.value]
                            },
                        },
                        {
                            path: ':id',
                            name: 'advertisement.google.edit',
                            component: () => import('../views/campaign/google/edit.vue'),
                            meta: {
                                auth: true,
                                permissions: []
                            },
                        },
                    ],
                },
            ]
        },
        {
            path: '/:catchAll(.*)*',
            name: '404',
            component: () => import('../views/404.vue'),
            meta: {
                auth: false,
                permissions: [],
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.matched.some(record => record.meta.auth)) {
        if (authStore.isAuthenticated) {
            const userPermissions = authStore?.user?.permissions

            if (to.meta.permissions.every(perm => userPermissions?.includes(perm))) {
                next();
            } else {
                next({name: '404'})
            }
        } else {
            next({name: 'login'})
        }
    } else if (to.name === 'login') {
        if (authStore.isAuthenticated) {
            next({name: 'dashboard'})
        } else {
            next()
        }
    }
    else {
        next()
    }
})

export default router
