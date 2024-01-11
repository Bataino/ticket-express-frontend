import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
import PrimeVue from 'primevue/config';
import { Icon } from "@iconify/vue"
import vueCountryRegionSelect from 'vue3-country-region-select'
import VueKonva from 'vue-konva';
import ToastService from '@meforma/vue-toaster';
import Widget from '@/functions/widget';
import ConfirmationService from 'primevue/confirmationservice';

import router from './router'

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/css/bootstrap.css'
import '@/assets/css/style.less'
import 'vue-loading-overlay/dist/css/index.css';

import InputText from 'primevue/inputtext';
import Header from "@components/Header.vue"
import Button from 'primevue/button';


const app = createApp(App)
.use(store)
.use(router)
.use(PrimeVue)
.use(vueCountryRegionSelect)
.use(VueKonva)
.use(ConfirmationService)
.use(ToastService, {
    'position':'top-right',
    duration:3000
})
.component('te-header', Header)
.component('pv-button', Button)
.component('pv-inputtext', InputText)
.component('icon', Icon)

app.config.globalProperties.$widget = Widget
app.config.globalProperties.$te = {
    currency:"$",
    scanApp:"http://127.0.0.1:5174/app/"
}


app.mount('#app')