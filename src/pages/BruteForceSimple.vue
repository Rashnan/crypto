<script setup lang="ts">
import { computed, ref } from 'vue';
import { SimpleAlgorithmType } from '../components/SimpleNumberCipher.vue';
import { additiveCipher, asciiFromAlpha, asciiToAlpha, euclideanGcd, multiplicativeCipher } from '../lib';

const ciphertext = ref("")

const algorithms = ["additive", "multiplicative"] as SimpleAlgorithmType[]
const algorithm = ref<SimpleAlgorithmType>("additive")

const keys = computed(() => {
    if (algorithm.value == "additive") {
        return [...Array(26).keys()]
    }

    else if (algorithm.value == "multiplicative") {
        return [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]
    }

    return []
})
const ciphertexts = computed(() => keys.value.map(key => ciphertext.value.split("").map(c => {
    const n = asciiToAlpha(c.charCodeAt(0))
    if (n < 0)
        return c

    if (algorithm.value == "additive") {
        const keyInv = key < 0 ? 26 + key : 26 - key
        return String.fromCharCode(asciiFromAlpha(additiveCipher(n, keyInv)))
    }
    else if (algorithm.value == "multiplicative") {
        const gcd = euclideanGcd(key, 26)
        const t2 = gcd[gcd.length - 1].t2
        const keyInv = t2 < 0 ? 26 + t2 : t2

        return String.fromCharCode(asciiFromAlpha(multiplicativeCipher(n, keyInv)))
    }

    return c
}).join("")))
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4">Brute force</h4>
        <h6 class="text-h6">Additive and Multiplicative Ciphers</h6>
        <v-divider thickness="3" class="my-2" />
        <v-text-field
            v-model="ciphertext"
            class="my-4"
            label="Encrypted"
            hide-details="auto"
        />
        <v-select
            v-model="algorithm"
            class="my-4"
            label="Algorithm"
            :items="algorithms"
            hide-details="auto"
        />
        <v-table v-if="ciphertext.length > 0">
            <thead>
                <tr>
                    <th width="150" class="text-center">Original Key</th>
                    <th :colspan="ciphertext.length" class="text-center">Encrypted</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ciphertext, i in ciphertexts" :key="i">
                    <td class="font-weight-bold border-e-sm">{{ keys[i] }}</td>
                    <td 
                        v-for="c in ciphertext.split('')"
                        :class="i == 0 ? 'font-weight-bold': ''"
                    >
                        {{ c }}
                    </td>
                </tr>
            </tbody>
        </v-table>
        <p v-else class="text-grey">No message provided</p>
    </v-sheet>
</template>

<style scoped>
</style>