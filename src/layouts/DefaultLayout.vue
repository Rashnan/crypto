<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const open = ref(false)

function selectNavItem(id: string) {
    router.push({ name: id })
}

const items = [
    { type: "subheader", title: "Math" },
    {
        value: "gcd",
        title: "GCD"
    },
    {
        value: "crt",
        title: "Chinese Remainder Theorem"
    },
    { type: "divider" },
    { type: "subheader", title: "Encrypt" },
    {
        value: "simple",
        title: "Additive and Multiplicative Cipher",
    },
    {
        value: "affine",
        title: "Affine Cipher",
    },
    {
        value: "autokey",
        title: "AutoKey Cipher"
    },
    {
        value: "playfair",
        title: "Playfair Cipher"
    },
    {
        value: "hill",
        title: "Hill Cipher"
    },
    {
        value: "transposition",
        title: "Transposition Cipher"
    },
    { type: "divider" },
    { type: "subheader", title: "Brute Force" },
    {
        value: "brute/simple",
        title: "Additive and Multiplicative"
    },
    {
        value: "brute/affine",
        title: "Affine"
    }
].map(v => Object.assign(v, { active: v.value == route.name }))
</script>

<template>
    <v-layout>
        <v-navigation-drawer
            permanent
        >
            <v-list
                density="compact"
                nav
                @click:select="({ id }) => selectNavItem(id as string)"
                color="primary"
                :items="items"
                style="text-align:left;"
            />
        </v-navigation-drawer>
        <v-app-bar
            density="compact"
            title="Cryptography"
        />
        <v-main>
            <slot />
        </v-main>
    </v-layout>
</template>

<style scoped>
</style>