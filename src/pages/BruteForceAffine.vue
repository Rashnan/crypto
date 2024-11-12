<script setup lang="ts">
import { ref } from 'vue';
import { additiveCipher, asciiFromAlpha, asciiToAlpha, euclideanGcd, multiplicativeCipher } from '../lib';

const plaintext = ref("")

const multiplicativeKeys = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]
const additiveKeys = [...Array(26).keys()]
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4">Brute force</h4>
        <h6 class="text-h6">Additive and Multiplicative Ciphers</h6>
        <v-divider thickness="3" class="my-2" />
        <v-text-field
            v-model="plaintext"
            class="my-4"
            label="Message"
            hide-details="auto"
        />
        <v-table style="max-width: 1400px" v-if="plaintext.length > 0">
            <thead>
                <tr>
                    <th class="border-e-sm text-center" width="100">Original A / M</th>
                    <th v-for="m, i in multiplicativeKeys" :class="`border-e-sm text-center${i % 2 == 0 ? ' bg-grey-lighten-2': ''}`" :key="m">
                        {{ m }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a, j in additiveKeys" :class="j % 2 == 0 ? 'bg-grey-lighten-4' : ''" :key="a">
                    <td class="border-e-sm">
                        {{ a }}
                    </td>
                    <td v-for="m, i in multiplicativeKeys" :class="`border-e-sm text-center${i % 2 == 0 ? ' bg-grey-lighten-2': ''}`" :key="m">
                        {{ String.fromCharCode(...plaintext.split("").map(c => {
                            const aInv = 26 - a
                            const gcd = euclideanGcd(m, 26)
                            const t2 = gcd[gcd.length - 1].t2
                            const mInv = t2 < 0 ? 26 + t2 : t2

                            return asciiFromAlpha(
                                multiplicativeCipher(
                                    additiveCipher(
                                        asciiToAlpha(c.charCodeAt(0)), 
                                    aInv),
                                mInv)
                            )
                        })) }}
                    </td>
                </tr>
            </tbody>
        </v-table>
        <p v-else class="text-grey">No message provided</p>
    </v-sheet>
</template>

<style scoped>
</style>