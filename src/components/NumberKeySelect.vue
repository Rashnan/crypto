<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title?: string
}>()

const k = ref(0)

const MAX_KEY = 26
const MIN_KEY = -26

function incrementKey() {
    k.value += 1
    k.value = Math.max(Math.min(k.value, MAX_KEY), MIN_KEY)
}
function decrementKey() {
    k.value -= 1
    k.value = Math.max(Math.min(k.value, MAX_KEY), MIN_KEY)
}
function resetKey() {
    k.value = 0
}

defineExpose({ k })
</script>

<template>
    <v-card
        :title="props.title"
        width="300"
        elevation="0"
        class="mx-auto"
    >
        <v-card-text class="pt-4 pb-0">
            <v-row>
                <v-col cols="8">
                    <v-text-field
                        label="Key"
                        v-model="k"
                        type="number"
                        :max="MAX_KEY"
                        :min="MIN_KEY"
                    />
                </v-col>
                <v-col cols="4">
                    <v-btn
                        icon="mdi-restore"
                        @click="resetKey"
                        variant="text"
                    />
                </v-col>
            </v-row>
            <v-slider
                v-model="k"
                :max="MAX_KEY"
                :min="MIN_KEY"
                :step="1"
            >
                <template v-slot:prepend>
                    <v-btn
                        icon="mdi-minus"
                        variant="text"
                        @click="decrementKey"
                    />
                </template>
                <template v-slot:append>
                    <v-btn
                        icon="mdi-plus"
                        variant="text"
                        @click="incrementKey"
                    />
                </template>
            </v-slider>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>