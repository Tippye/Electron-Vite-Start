import {createApp} from 'vue'
import './style.scss'
import App from './App.vue'
import {setupElementPlus} from '@/plugins/ElementPlus'
import {setupI18n} from "@/plugins/I18n";
import {setupStore} from "@/stores";
import {setupRouter} from "@/router";

const setupAll = async () => {
    const app = createApp(App)

    await setupI18n(app)

    setupElementPlus(app)

    setupStore(app)

    setupRouter(app)

    await app.mount('#app').$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')

        // window.ipcRenderer.on('main-process-message', (_event, message) => {
        //     console.log(message)
        // })
    })
}

setupAll()
