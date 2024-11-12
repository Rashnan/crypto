<script setup lang="ts">
import { computed } from 'vue';
import { additiveCipher, asciiFromAlpha, asciiToAlpha } from '../lib';

const props = defineProps<{
    plaintext: string,
    _key: string,
    repeat: boolean,
}>()

const plaintext = computed(() => props.plaintext.replace(/ /g, ""))
const _key = computed(() => props._key.replace(/ /g, ""))
const repeat = computed(() => props.repeat)

const pValues = computed(() => plaintext.value.split("").map(v => asciiToAlpha(v.charCodeAt(0))))

const keystream = computed(() => repeat.value
    ? Array(plaintext.value.length).fill(0).map((_v, i) => _key.value[i % _key.value.length]).join("")
    : (_key.value + plaintext.value).substring(0, plaintext.value.length)
)
const kValues = computed(() => keystream.value.split("").map(v => asciiToAlpha(v.charCodeAt(0))))

const cValues = computed(() => {
    return pValues.value.map((v, i) => additiveCipher(v, kValues.value[i]))
})
const ciphertext = computed(() => cValues.value.map(v => String.fromCharCode(asciiFromAlpha(v))).join(""))

defineExpose({ ciphertext })
</script>

<template>
    <v-table>
        <tbody>
            <tr>
                <td>Plaintext:</td>
                <td v-for="c, i in plaintext" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>P Values:</td>
                <td v-for="c, i in pValues" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>Key Stream:</td>
                <td v-for="c, i in keystream" :key="i">
                    {{ c }}
                </td>
            </tr>
            <tr>
                <td>K Values:</td>
                <td v-for="c, i in kValues" :key="i">
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