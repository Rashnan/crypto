<script setup lang="ts">
import { computed, ref } from 'vue';

import NumberKeySelect from '../components/NumberKeySelect.vue';
import SimpleNumberCipher, { SimpleAlgorithmType as SimpleAlgorithmType } from '../components/SimpleNumberCipher.vue';

const keySelector = ref<typeof NumberKeySelect | null>(null)
const encrypter = ref<typeof SimpleNumberCipher | null>(null)

const key = computed<number>(() => keySelector.value?.k || 0)
const plaintext = ref("")

const algorithms = ["additive", "multiplicative"] as SimpleAlgorithmType[]
const algorithm = ref<SimpleAlgorithmType>("multiplicative")

const ciphertext = computed<string>(() => encrypter.value?.ciphertext || "")
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">Simple Cipher</h4>
        <v-divider thickness="3" />
        <v-row>
            <v-col sm="6">
                <NumberKeySelect ref="keySelector" title="Key Select" />
            </v-col>
            <v-col sm="6">
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
                        class="my-4"
                        label="Encrypted"
                        hide-details="auto"
                        variant="outlined"
                        disabled
                        readonly
                    />
                    <v-select
                        v-model="algorithm"
                        class="my-4"
                        label="Algorithm"
                        :items="algorithms"
                        hide-details="auto"
                    />
                </v-card>
            </v-col>
        </v-row>
        <v-divider thickness="3" />
        <v-row style="max-width: 700px;" v-if="plaintext.length > 0">
            <v-col>
                <SimpleNumberCipher ref="encrypter" :algorithm="algorithm" :plaintext="plaintext" :shift="Number(key)" />
            </v-col>
        </v-row>
        <p v-else class="text-grey mt-2">No message provided</p>
    </v-sheet>
</template>

<style scoped>
</style>