<script setup lang="ts">
import { computed } from 'vue';
import { additiveCipher, asciiFromAlpha, asciiToAlpha, multiplicativeCipher } from '../lib';

const props = defineProps<{
    shiftM: number,
    shiftA: number,
    reverse: boolean,
    plaintext: string
}>()

const shiftM = computed(() => props.shiftM % 26)
const shiftA = computed(() => props.shiftA % 26)
const reverse = computed(() => props.reverse)
const plaintext = computed(() => props.plaintext)

const plaintextAlphas = computed(() => plaintext.value.split("").map(v => asciiToAlpha(v.charCodeAt(0))))

const ciphertextAlphas_1 = computed(() => plaintextAlphas.value.map(v => reverse.value ? additiveCipher(v, shiftA.value) : multiplicativeCipher(v, shiftM.value)
))

const ciphertextAlphas_2 = computed(() => ciphertextAlphas_1.value.map(v => reverse.value ? multiplicativeCipher(v, shiftM.value) : additiveCipher(v, shiftA.value)
))

const ciphertext = computed(() => ciphertextAlphas_2.value.map((v, i) => asciiFromAlpha(v) < 0 ? plaintext.value[i] : String.fromCharCode(asciiFromAlpha(v))).join(""))

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
                <td>{{ reverse ? 'Added' : 'Multiplied' }}: </td>
                <td v-for="c, i in ciphertextAlphas_1" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>{{ reverse ? 'Multiplied' : 'Added' }}: </td>
                <td v-for="c, i in ciphertextAlphas_2" :key="i">
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