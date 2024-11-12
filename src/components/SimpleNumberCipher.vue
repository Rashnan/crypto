<script setup lang="ts">
import { computed } from 'vue';
import { additiveCipher, asciiFromAlpha, asciiToAlpha, multiplicativeCipher } from '../lib';

export type SimpleAlgorithmType = "additive" | "multiplicative"
const props = defineProps<{
    algorithm: SimpleAlgorithmType,
    shift: number,
    plaintext: string
}>()

const shift = computed(() => props.shift % 26)
const plaintext = computed(() => props.plaintext)

const plaintextAlphas = computed(() => plaintext.value.split("").map(v => asciiToAlpha(v.charCodeAt(0))))

const algorithm = computed(() => props.algorithm == "additive" ? additiveCipher : multiplicativeCipher)
const ciphertextAlphas = computed(() => plaintextAlphas.value.map(v => algorithm.value(v, shift.value)))

const ciphertext = computed(() => ciphertextAlphas.value.map((v, i) => asciiFromAlpha(v) < 0 ? plaintext.value[i] : String.fromCharCode(asciiFromAlpha(v))).join(""))

defineExpose({ ciphertext })
</script>

<template>
    <v-table>
        <tbody>
            <tr>
                <td>Plaintext: </td>
                <td v-for="c, i in plaintext" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>Code: </td>
                <td v-for="c, i in plaintextAlphas" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>Added: </td>
                <td v-for="c, i in ciphertextAlphas" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>Ciphertext: </td>
                <td v-for="c, i in ciphertext" :key="i">
                    {{ c }}
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped>
</style>