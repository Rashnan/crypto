<script setup lang="ts">
import { computed, ref } from 'vue';
import { euclideanGcd } from '../lib';

const a = ref(13), b = ref(2)
const steps = computed(() => euclideanGcd(a.value, b.value))
</script>

<template>
    <v-sheet min-width="600">
        <h4 class="text-h4 mb-4">GCD Calculator</h4>
        <v-divider thickness="3" />
        <v-row class="mt-4">
            <v-col>
                <v-text-field
                    label="First number"
                    v-model="a"
                    type="number"
                    :min="1"
                />
            </v-col>
            <v-col>
                <v-text-field
                    label="Second number"
                    v-model="b"
                    type="number"
                    :min="1"
                />
            </v-col>
        </v-row>
        <v-divider thickness="2" />
        <v-row>
            <v-col>
                <v-list density="compact">
                    <v-list-subheader>
                        Regular Euclidean
                    </v-list-subheader>
                    <v-list-item v-for="step, i in steps" :key="i">
                        <math>
                            <mn>{{ step.a }}</mn>
                            <mo>=</mo>
                            <mn>{{ step.q }}</mn>
                            <mo>*</mo>
                            <mn>{{ step.b }}</mn>
                            <mo>+</mo>
                            <mn>{{ step.r }}</mn>
                        </math>
                    </v-list-item>
                    <v-list-item>
                        <math>
                            <mi>gcd({{ a }}, {{ b }})</mi>
                            <mo>=</mo>
                            <mn>{{ steps[steps.length - 1].b }}</mn>
                        </math>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col>
                <v-list density="compact">
                    <v-list-subheader>
                        Extended Euclidean
                    </v-list-subheader>
                </v-list>
                <v-list-item v-for="step, i in steps" :key="i">
                    <math>
                        <mn>{{ step.r }}</mn>
                        <mo>=</mo>
                        <mn>({{ step.s3 }})</mn>
                        <mo>*</mo>
                        <mn>{{ steps[0].a }}</mn>
                        <mo>+</mo>
                        <mn>({{ step.t3 }})</mn>
                        <mo>*</mo>
                        <mn>{{ steps[0].b }}</mn>
                    </math>
                </v-list-item>
                <v-list-item>
                    <math>
                        <mi>
                            (
                            <msup>
                                <mn>{{ steps[0].b }}</mn>
                                <mn>-1</mn>
                            </msup>
                            )
                        </mi>
                        <mi>mod {{ steps[0].a }}</mi>
                        <mo>=</mo>
                        <mn>{{ steps.length > 1 ? steps[steps.length - 2].t3 : 0 }}</mn>
                        <mi v-if="steps.length > 1 && steps[steps.length - 2].t3 < 0" class="mx-1">=</mi>
                        <mn v-if="steps.length > 1 && steps[steps.length - 2].t3 < 0">{{ steps[steps.length - 2].t3 + steps[0].a }}</mn>
                    </math>
                </v-list-item>
            </v-col>
        </v-row>
        <v-divider thickness="2" />
        <div class="text-body-2 text-grey-darken-1 mt-3">Tabular Method</div>
        <v-table>
            <thead>
                <tr>
                    <th><math><mi>q</mi></math></th>
                    <th><math><mi>a</mi></math></th>
                    <th><math><mi>b</mi></math></th>
                    <th><math><mi>r</mi></math></th>

                    <th><math><mi>s1</mi></math></th>
                    <th><math><mi>s2</mi></math></th>
                    <th><math><mi>s3</mi></math></th>
                    
                    <th><math><mi>t1</mi></math></th>
                    <th><math><mi>t2</mi></math></th>
                    <th><math><mi>t3</mi></math></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="step, i in steps" :key="i">
                    <td>{{ step.q }}</td>
                    <td>{{ step.a }}</td>
                    <td>{{ step.b }}</td>
                    <td>{{ step.r }}</td>
                    
                    <td>{{ step.s1 }}</td>
                    <td>{{ step.s2 }}</td>
                    <td>{{ step.s3 }}</td>
                    
                    <td>{{ step.t1 }}</td>
                    <td>{{ step.t2 }}</td>
                    <td>{{ step.t3 }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-sheet>
</template>

<style scoped>
table {
    width: 100%;
    overflow-x: scroll;
}
th {
    text-align: center;
}
</style>