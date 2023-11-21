import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import { Icon } from "@iconify/vue"
import vueCountryRegionSelect from 'vue3-country-region-select'

import store from './store'
import router from './router'

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/css/bootstrap.css'
import '@/assets/css/style.css'

import InputText from 'primevue/inputtext';
import Header from "@components/Header.vue"
import Button from 'primevue/button';

createApp(App)
.use(router)
.use(store)
.use(PrimeVue)
.use(vueCountryRegionSelect)
.component('te-header', Header)
.component('pv-button', Button)
.component('pv-inputtext', InputText)
.component('icon', Icon)
.mount('#app')

