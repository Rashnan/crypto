<script setup lang="ts">
import { computed, ref } from 'vue';
import { _transpositionKeyFromOrder, transpositionCipher } from '../lib';

const plaintext = ref("ISRNGBUTLF RRAFRLIDLP FTIYONVSEE TBEHIHTETA EYHATTUCME HRGTAIOENT TUSRUIEADR FOETOLHMET NTEDSIFWRO HUTELEITDS")
// CORNFLAKES: SEND RESUPPLY TO THE BRIDGE BY THE CHURCH XX AMMO NEEDED URGENTLY WITH MAGASINES XXX

// BE AT THE THIRD PILLAR FROM THE LEFT OUTSIDE THE LYCEUM THEATRE TONIGHT AT SEVEN IF YOU ARE DISTRUSTFUL BRING TWO FRIENDS
// --> ISRNGBUTLF RRAFRLIDLP FTIYONVSEE TBEHIHTETA EYHATTUCME HRGTAIOENT TUSRUIEADR FOETOLHMET NTEDSIFWRO HUTELEITDS

type Layer = {
    type: 'column' | 'row',
    rev: boolean,
    flip: boolean,
    k: string
}
const layers = ref<Layer[]>([
    // {
    //     type: 'column',
    //     rev: false,
    //     flip: false,
    //     k: 'CORNFLAKES'
    // }

    // {
    //     type: 'column',
    //     rev: false,
    //     flip: false,
    //     k: 'CRYPTOGRAPHIC'
    // },
    // {
    //     type: 'column',
    //     rev: false,
    //     flip: false,
    //     k: 'NETWORK SECU'// NETWORK SECURITY -- max length 10, repeated characters removed
    // },
    
    // decrypting above
    {
        type: 'row',
        rev: false,
        flip: false,// no flip for first one
        k: _transpositionKeyFromOrder([4, 2, 8, 10, 5, 6, 3, 7, 1, 9])// the list of orders for the original key: NETWORK SECU
    },
    {
        type: 'row',
        rev: false,
        flip: true,
        k: _transpositionKeyFromOrder([2, 8, 10, 7, 9, 6, 3, 1, 4, 5])// the list of orders for the original key: CRYPTOGRAPHIC
    },
    {
        type: 'row',
        rev: false,
        flip: true,// need to flip at the end
        k: _transpositionKeyFromOrder([...Array(10).keys()])// random 10 letter key doesnt matter
    },
])

const layersCalc = computed(() => {
    let prevtext = plaintext.value
    return layers.value.map(layer => {
        let cipher = transpositionCipher(prevtext, layer.k, layer.type, layer.rev, layer.flip)
        prevtext = cipher.c
        return {
            ...cipher,
            type: layer.type
        }
    })
})

const ciphertext = computed(() => layersCalc.value[layersCalc.value.length - 1].c)
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">Transposition Cipher</h4>
        <v-divider thickness="3" />
        <v-text-field
            v-model="plaintext"
            label="Message"
            class="mt-4"
        />
        <v-text-field
            v-model="ciphertext"
            label="Encrypted"
            class="mt-4"
            variant="outlined"
            readonly
        />
        <v-divider thickness="3" />
        <v-table
            v-if="layers.length > 0"
            density="compact"
            class="mt-4"
            style="table-layout: fixed;"
        >
            <thead>
                <tr>
                    <th>Reverse</th>
                    <th>Flip</th>
                    <th>Type</th>
                    <th>Key</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in [...Array(Number(layers.length)).keys()]" :key="i">
                    <td width="50">
                        <v-checkbox
                            v-model="layers[i].rev"
                            color="error"
                            label=""
                        />
                    </td>
                    <td width="50">
                        <v-checkbox
                            v-model="layers[i].flip"
                            color="error"
                            label=""
                        />
                    </td>
                    <td width="200">
                        <v-autocomplete
                            v-model="layers[i].type"
                            label="Type"
                            :items="['column', 'row']"
                            class="mt-4"
                            max-width="150"
                        />
                    </td>
                    <td width="300">
                        <v-text-field
                            v-model="layers[i].k"
                            label="Key"
                            class="mt-4"
                        />
                    </td>
                    <td>
                        <v-btn
                            color="error"
                            icon="mdi-cancel"
                            variant="text"
                            @click="layers.splice(i, 1)"
                        />
                    </td>
                </tr>
            </tbody>
        </v-table>
        <p v-else class="my-2 text-grey">No layers created</p>
        <v-btn
            append-icon="mdi-plus"
            text="Add"
            class="mt-2 mb-4"
            color="primary"
            @click="layers.push({
                'type': 'column',
                'k': 'abcdef'
            } as Layer)"
        />
        <v-divider thickness="3" />
        <v-card
            v-for="layer, layerNo in layersCalc"
            :key="layerNo"
            :title="`Layer ${layerNo + 1}`"
        >
            <v-card-text>
                <v-table>
                    <thead v-if="layer.type == 'column'">
                        <tr>
                            <th v-for="c, i in layer.k" :key="c" class="bg-blue-lighten-5 text-center">
                                {{ c }}<sub>{{ layer.kOrder[i] + 1 }}</sub>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="chunk, i in layer.chunks" :key="i">
                            <td v-if="layer.type == 'row'" class="bg-blue-lighten-5">
                                {{ layer.k[i] }}<sub>{{ layer.kOrder[i] + 1 }}</sub>
                            </td>
                            <td v-for="c, j in chunk" :key="j">
                                {{ c }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <v-text-field
                    v-model="layer.c"
                    :label="`Stage ${layerNo + 1}`"
                    readonly
                    variant="outlined"
                    class="mt-4"
                />
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<style lang="postcss">
</style>