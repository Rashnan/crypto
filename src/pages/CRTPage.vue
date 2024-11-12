<script setup lang="ts">
import { computed, ref } from 'vue';
import { euclideanGcd } from '../lib';

const n = ref(4)

const as = ref<number[]>([4, 3, 1, 2])
const ms = ref<number[]>([6, 5, 7, 11])

const M = computed(() => ms.value.reduce((acc, x) => acc * x, 1))
const Mi = computed(() => ms.value.map(v => M.value / v))
const MiMod = computed(() => Mi.value.map((v, i) => v % (ms.value[i] ?? 1)))
const MiModInv = computed(() => MiMod.value.map((v, i) => {
    const ans = euclideanGcd(v, ms.value[i] ?? 1)
    const fakeMod = ans[ans.length - 1]["t2"]
    return fakeMod < 0 ? (ms.value[i] ?? 1) + fakeMod : fakeMod
}))
const x = computed(() => as.value.map((v, i) => v * Mi.value[i] * MiModInv.value[i]).reduce((acc, x) => acc + x, 0) % M.value)
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">Chinese Remaineder Theorem</h4>
        <v-divider thickness="3" />
        <v-text-field
            class="mt-4"
            v-model="n"
            label="n"
            type="number"
            :min="1"
        />
        <div class="mb-4">
            <v-row v-for="i in [...Array(Number(n)).keys()]" :key="i">
                <v-col md="3">
                    <v-text-field
                        v-model="as[i]"
                        label="a1"
                        type="number"
                        hide-details="auto"
                        :min="1"
                        :default="1"
                    />
                </v-col>
                <v-col md="3">
                    <v-text-field
                        v-model="ms[i]"
                        label="m1"
                        type="number"
                        hide-details="auto"
                        :min="1"
                        :default="10"
                    />
                </v-col>
                <v-col md="6" style="display: flex; justify-content: center; align-items: center;">
                    x &#8801; {{ as[i] }} ( mod {{ ms[i] }} )
                </v-col>
            </v-row>
        </div>
        <v-divider thickness="3" />
        <v-row class="mt-2">
            <v-col>
                x = {{ x }} mod {{ M }}
            </v-col>
        </v-row>
        <v-table>
            <thead>
                <tr>
                    <th class="text-center">#</th>
                    <th class="text-center">M<sub>i</sub></th>
                    <th class="text-center">M<sub>i</sub> mod m<sub>i</sub></th>
                    <th class="text-center">M<sub>i</sub><sup>-1</sup> mod m<sub>i</sub></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in [...Array(Number(n)).keys()]" :key="i">
                    <td>M{{ i+1 }} :</td>
                    <td>{{ Mi[i] }}</td>
                    <td>{{ MiMod[i] }}</td>
                    <td>{{ MiModInv[i] }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-sheet>
</template>

<style scoped>
</style>