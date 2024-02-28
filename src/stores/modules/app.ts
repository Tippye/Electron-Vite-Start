import {defineStore} from "pinia";
import {store} from "@/stores";

interface AppStore {
    title: string; // App名称
    logo: string; // logo地址
    footerContent: string; // 页脚内容
    icpNumber: string; // 备案号
    isMax: boolean; // 是否开启全屏
    darkmode: boolean; // 是否开启暗黑模式
    size: boolean; // 页面大小
}

export const useAppStore = defineStore("app", {
    state: (): AppStore => {
        return {
            darkmode: false,
            footerContent: "",
            icpNumber: "",
            isMax: false,
            logo: "",
            size: false,
            title: ""
        }
    },
    actions: {
        changeSize(size: boolean) {
            this.size = size;
        },
        changeDarkmode(darkmode: boolean) {
            this.darkmode = darkmode;
        },
        changeWinMode(isMax: boolean) {
            this.isMax = isMax;
        },
    },
    getters: {
        getDarkmode(): boolean {
            return this.darkmode;
        }
    },
})

window.ipcRenderer.on("app:changeDarkmode", (_e: any, darkmode: boolean) => {
    const store = useAppStore();
    store.changeDarkmode(darkmode)
})

export const useAppStoreWithOut = useAppStore(store)