import {defineStore} from 'pinia'
import {store} from '../index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import {LocaleDropdownType} from "../../../types";
import {setStorage} from "@/utils/storage.ts";

const elLocaleMap = {
    'zh-CN': zhCn,
    'en': en
}

interface LocaleState {
    currentLocale: LocaleDropdownType
    localeMap: LocaleDropdownType[]
}


export const useLocaleStore = defineStore('locales', {
    state: (): LocaleState => {
        return {
            currentLocale: {
                lang: 'zh-CN',
                elLocale: elLocaleMap['zh-CN']
            },
            // 多语言
            localeMap: [
                {
                    lang: 'zh-CN',
                    name: '简体中文'
                },
                {
                    lang: 'en',
                    name: 'English'
                }
            ]
        }
    },
    getters: {
        getCurrentLocale(): LocaleDropdownType {
            return this.currentLocale
        },
        getLocaleMap(): LocaleDropdownType[] {
            return this.localeMap
        }
    },
    actions: {
        setCurrentLocale({lang}: LocaleDropdownType) {
            // this.locale = Object.assign(this.locale, localeMap)
            lang = lang || 'zh-CN'
            this.currentLocale.lang = lang
            this.currentLocale.elLocale = elLocaleMap[lang]
            setStorage('lang', lang)
        }
    }
})

export const useLocaleStoreWithOut = () => {
    return useLocaleStore(store)
}
