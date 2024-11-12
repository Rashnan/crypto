<script setup lang="ts">
import { computed, ref } from 'vue';
import AutoKeyCipher from '../components/AutoKeyCipher.vue';
import AutoKeyDecipher from '../components/AutoKeyDecipher.vue';

const encrypt = ref(false)

const message = ref("")
const _key = ref("")
const repeat = ref(false)

const encrypter = ref<typeof AutoKeyCipher | null>(null)
const decrypter = ref<typeof AutoKeyDecipher | null>(null)

const ciphertext = computed(() => encrypter.value?.ciphertext || "")
const plaintext = computed(() => decrypter.value?.plaintext || "")
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">Auto Key Cipher</h4>
        <v-card
            elevation="0"
        >
            <v-tabs
                v-model="encrypt"
                align-tabs="center"
            >
                <v-tab :value="true">Encrypt</v-tab>
                <v-tab :value="false">Decrypt</v-tab>
            </v-tabs>

            <v-tabs-window v-model="encrypt">
                <v-tabs-window-item :value="true">
                    <v-text-field
                        v-model="message"
                        class="my-4"
                        label="Message"
                        hide-details="auto"
                    />
                    <v-text-field
                        v-model="_key"
                        label="Key"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="repeat"
                        label="Repeat Key"
                        hide-details="auto"
                    />
                    <v-text-field
                        v-model="ciphertext"
                        class="mb-4"
                        label="Encrypted"
                        hide-details="auto"
                        variant="outlined"
                        disabled
                        readonly
                    />
                    <template v-if="message.length != 0 && _key.length != 0">
                        <v-divider thickness="3" />
                        <AutoKeyCipher 
                            ref="encrypter"
                            :plaintext="message"
                            :_key="_key"
                            :repeat="repeat"
                        />
                    </template>
                    <p v-else class="text-grey mt-2">No message or key provided</p>
                </v-tabs-window-item>
                <v-tabs-window-item :value="false">
                    <v-text-field
                        v-model="message"
                        class="my-4"
                        label="Ciphertext"
                        hide-details="auto"
                    />
                    <v-text-field
                        v-model="_key"
                        label="Key"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="repeat"
                        label="Repeat Key"
                        hide-details="auto"
                    />
                    <v-text-field
                        v-model="plaintext"
                        class="mb-4"
                        label="Decrypted"
                        hide-details="auto"
                        variant="outlined"
                        disabled
                        readonly
                    />
                    <template v-if="message.length != 0 && _key.length != 0">
                        <v-divider thickness="3" />
                        <AutoKeyDecipher 
                            ref="decrypter"
                            :ciphertext="message"
                            :_key="_key"
                            :repeat="repeat"
                        />
                    </template>
                    <p v-else class="text-grey mt-2">No message or key provided</p>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card>
    </v-sheet>
</template>

<style scoped>
</style>