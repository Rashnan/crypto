<script setup lang="ts">
import { ref } from 'vue';

const rawKey = ref("")
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">Hill Cipher</h4>
        <v-divider thickness="3" />
        <v-row>
            <v-col cols="3">
                <v-text-field
                    v-model="rawKey"n
                    label="Key"
                    hide-details="auto"
                    class="mt-4"
                />
            </v-col>
            <v-col cols="3">
                
            </v-col>
            <v-col cols="6">
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style lang="postcss" scoped>
</style>