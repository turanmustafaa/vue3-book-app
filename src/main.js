import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/style.css"
import appHeader from "@/components/Shared/appHeader"
import appBookmarkList from "@/components/Shared/appBookmarkList"
import {appAxios} from '@/utils/appAxios'
import store from './store'

const app = createApp(App)
app.component("appBookmarkList", appBookmarkList)
app.component("appHeader", appHeader)
app.use(router)
app.mount('#app')
app.use(store)
app.config.globalProperties.$appAxios = appAxios
