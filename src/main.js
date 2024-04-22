import './assets/main.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'
import helper from "@/plugins/helper.js";

const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)
app.use(helper)
app.mount('#app')
