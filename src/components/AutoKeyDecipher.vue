<script setup lang="ts">
import { computed } from 'vue';
import { additiveCipher, asciiFromAlpha, asciiToAlpha } from '../lib';

const props = defineProps<{
    ciphertext: string,
    _key: string,
    repeat: boolean,
}>()

const ciphertext = computed(() => props.ciphertext.replace(/ /g, ""))
const _key = computed(() => props._key.replace(/ /g, ""))
const repeat = computed(() => props.repeat)

const cValues = computed(() => ciphertext.value.split("").map(v => asciiToAlpha(v.charCodeAt(0))))

const decrypted = computed(() => {
    let pValues: number[] = []
    let kValues: number[] = []

    for (let i = 0; i < cValues.value.length; ++i) {
        const kVal = i >= _key.value.length
            ? (
                repeat.value
                ? asciiToAlpha(_key.value[i % _key.value.length].charCodeAt(0))
                : pValues[i - _key.value.length]
            )
            : asciiToAlpha(_key.value[i].charCodeAt(0))

        kValues.push(kVal)
        pValues.push(additiveCipher(cValues.value[i], -kVal))
    }

    const keystream = String.fromCharCode(...kValues.map(v => asciiFromAlpha(v)))
    const plaintext = String.fromCharCode(...pValues.map(v => asciiFromAlpha(v)))

    return { keystream, kValues, plaintext, pValues }
})

defineExpose({ plaintext: computed(() => decrypted.value.plaintext) })
</script>

<template>
    <v-table>
        <tbody>
            <tr>
                <td>Ciphertext:</td>
                <td v-for="c, i in ciphertext" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>C Values:</td>
                <td v-for="c, i in cValues" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>Key Stream:</td>
                <td v-for="c, i in decrypted.keystream" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>K Values:</td>
                <td v-for="c, i in decrypted.kValues" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>P Values:</td>
                <td v-for="c, i in decrypted.pValues" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>Plaintext: </td>
                <td v-for="c, i in decrypted.plaintext" :key="i">
                    {{ c }}
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped>
</style>