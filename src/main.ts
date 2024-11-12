import { createApp } from 'vue'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Tres from '@tresjs/core'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'
import './style.css'

import { router } from './router'
import App from './App.vue'

const vuetify = createVuetify({ components: { ...components }, directives })

createApp(App)
    .use(router)
    .use(vuetify)
    .use(Tres)
    .mount('#app')