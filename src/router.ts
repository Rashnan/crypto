import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import DefaultLayout from './layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
    // path: '/',
    {
        path: '',
        redirect: 'simple'
    },

    // math
    {
        path: 'gcd',
        name: 'gcd',
        component: () => import('./pages/GCDPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },

    // ciphers
    {
        path: 'simple',
        name: 'simple',
        component: () => import('./pages/SimpleCipherPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },
    {
        path: 'affine',
        name: 'affine',
        component: () => import('./pages/AffineCipherPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },
    {
        path: 'autokey',
        name: 'autokey',
        component: () => import('./pages/AutoKeyCipherPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },
    {
        path: 'playfair',
        name: 'playfair',
        component: () => import('./pages/PlayFairCipherPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },
    {
        path: 'hill',
        name: 'hill',
        component: () => import('./pages/HillCipherPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },
    {
        path: 'crt',
        name: 'crt',
        component: () => import('./pages/CRTPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },
    {
        path: 'transposition',
        name: 'transposition',
        component: () => import('./pages/TranspositionCipherPage.vue'),
        meta: {
            layout: DefaultLayout
        }
    },

    // brute forcing
    {
        path: 'brute',
        name: 'brute',
        meta: {
            layout: DefaultLayout
        },
        children: [
            { path: 'simple', name: 'brute/simple', component: () => import('./pages/BruteForceSimple.vue') },
            { path: 'affine', name: 'brute/affine', component: () => import('./pages/BruteForceAffine.vue') },
        ]
    },
    {
        path: ':catchAll(.*)*',
        name: '404',
        meta: {
            layout: DefaultLayout,
        },
        component: () => import('./pages/404Page.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})