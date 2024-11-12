<script setup lang="ts">
import { computed, ref } from 'vue';

import NumberKeySelect from '../components/NumberKeySelect.vue';
import AffineCipher from '../components/AffineCipher.vue';

const keyMSelector = ref<typeof NumberKeySelect | null>(null)
const keyASelector = ref<typeof NumberKeySelect | null>(null)
const encrypter = ref<typeof AffineCipher | null>(null)

const keyM = computed<number>(() => keyMSelector.value?.k || 0)
const keyA = computed<number>(() => keyASelector.value?.k || 0)
const reverse = ref(false)

const plaintext = ref("")

const ciphertext = computed<string>(() => encrypter.value?.ciphertext || "")
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">Affine Cipher</h4>
        <v-divider thickness="3" />
        <v-row>
            <v-col>
                <NumberKeySelect ref="keyMSelector" title="Key M" />
            </v-col>
            <v-col>
                <NumberKeySelect ref="keyASelector" title="Key A" />
            </v-col>
        </v-row>
        <v-divider thickness="3" />
        <v-row>
            <v-col class="mx-auto">
                <v-card
                    elevation="0"
                >
                    <v-text-field
                        v-model="plaintext"
                        class="my-4"
                        label="Message"
                        hide-details="auto"
                    />
                    <v-text-field
                        v-model="ciphertext"
                        label="Encrypted"
                        hide-details="auto"
                        variant="outlined"
                        disabled
                        readonly
                    />
                    <v-checkbox
                        v-model="reverse"
                        label="Reverse"
                        hide-details="auto"
                    />
                </v-card>
            </v-col>
        </v-row>
        <v-divider thickness="3" />
        <v-row style="max-width: 1400px;" v-if="plaintext.length > 0">
            <v-col>
                <AffineCipher ref="encrypter" :plaintext="plaintext" :shiftM="Number(keyM)" :shiftA="Number(keyA)" :reverse="reverse" />
            </v-col>
        </v-row>
        <p v-else class="text-grey mt-2">No message provided</p>
    </v-sheet>
</template>

<style scoped>
</style>