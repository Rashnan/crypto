<script setup lang="ts">
import { computed, ref } from 'vue';
import { playFairCipher } from '../lib';

const plaintext = ref("// KX JE YU RE BE ZW EH EW RY TU HE YF SK RE HE GO YF IW TT TU OL KS YC AJ PO BO TE IZ ON TX BY BN TG ON EY CU ZW RG DS ON SX BO UY WR HE BA AH YU SE DQ"),
    k = ref("royal new zealand navy"),
    reverse = ref(false)

// KX JE YU RE BE ZW EH EW RY TU HE YF SK RE HE GO YF IW TT TU OL KS YC AJ PO BO TE IZ ON TX BY BN TG ON EY CU ZW RG DS ON SX BO UY WR HE BA AH YU SE DQ

const sharedPair = ref(0)
const pair = computed(() => sharedPair.value == 0 ? "ij" : "jk")

const LETTERS = computed(() => "abcdefghijklmnopqrstuvwxyz".replace(pair.value[1], ""))
const keySet = computed(() => [...new Set(k.value.toLowerCase().replace(/ /g, "") + LETTERS.value)])
const matrix = computed(() => Array(5).fill(0).map(
    (_v, i) => Array(5).fill(0).map(
        (_v, j) => keySet.value[i * 5 + j] + (
            keySet.value[i * 5 + j] == pair.value[0]
            ? ` / ${pair.value[1]}`
            : ""
        )
    )
))
const charmap = computed(() => (LETTERS.value + pair.value[1]).split("").reduce((acc, v) => ({
    ...acc,
    [v]: matrix.value?.map((row, i) =>
        row.map((col, j) => col.includes(v) ? [i, j] : undefined)
            .reduce((acc, j) => acc || j)
    ).reduce((acc, pos) => acc || pos)
}), {}))

const pairs = computed(() => {
    const txt = plaintext.value.replace(/[. ]/g, "").toLowerCase()
    const tmp = txt + (txt.length % 2 == 0 ? "" : "x")
    const arr = []

    for (let i = 0; i < tmp.length; i += 2) {
        arr.push(tmp.slice(i, i + 2))
    }

    return arr
})

const cipherpairs = computed(() => pairs.value.map(v => playFairCipher(v, matrix.value, charmap.value, reverse.value)))
const ciphertext = computed(() => cipherpairs.value.join(""))

const ITEMS_PER_ROW = 10
</script>

<template>
    <v-sheet style="min-width: 600px;">
        <h4 class="mb-4 text-h4">PlayFair Cipher</h4>
        <v-divider thickness="3" />
        <v-row class="my-2">
            <v-col md="8" sm="6">
                <v-text-field
                    v-model="plaintext"
                    label="Message"
                    hide-details="auto"
                    class="mb-2"
                />
                <v-text-field
                    v-model="k"
                    label="Key"
                    hide-details="auto"
                    class="mb-2"
                />
                <v-btn-toggle
                    v-model="sharedPair"
                    color="primary"
                    variant="text"
                >
                    <v-btn>I/J</v-btn>
                    <v-btn>J/K</v-btn>
                </v-btn-toggle>
                <v-text-field
                    v-model="ciphertext"
                    label="Encrypted"
                    hide-details="auto"
                    variant="outlined"
                    class="my-2"
                    disabled
                    readonly
                />
            </v-col>
            <v-col md="4" sm="6">
                <v-card title="PlayFair Matrix" elevation="0">
                    <v-card-text>
                        <math>
                            <mrow>
                                <mo>(</mo>
                                <mtable>
                                    <mtr v-for="row, i in matrix" :key="i">
                                        <mtd v-for="col, j in row" :key="j"><mi>{{ col }}</mi></mtd>
                                    </mtr>
                                </mtable>
                                <mo>)</mo>
                            </mrow>
                        </math>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-divider thickness="3" />
        <v-table
            v-if="k.length > 0 && plaintext.length > 0"
            class="mt-4"
        >
            <tbody>
                <template v-for="_, row in Array(Math.ceil(cipherpairs.length / ITEMS_PER_ROW)).fill(0).map((_v, i) => i)">
                    <tr>
                        <td class="bg-grey-lighten-3">Plaintext:</td>
                        <td class="bg-grey-lighten-3"
                            v-for="pair, i in pairs.slice(row * ITEMS_PER_ROW, (row + 1) * ITEMS_PER_ROW)"
                            :key="i"
                        >
                            {{ pair }}
                        </td>
                    </tr>
                    <tr>
                        <td>Ciphertext:</td>
                        <td v-for="pair, i in cipherpairs.slice(row * ITEMS_PER_ROW, (row + 1) * ITEMS_PER_ROW)" :key="i">
                            {{ pair }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </v-table>
        <p v-else class="text-grey mt-2">No message provided</p>
    </v-sheet>
</template>

<style scoped>
math mtable mi {
    padding: 5px
}
</style>