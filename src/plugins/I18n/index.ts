import type {App} from 'vue'
import {createI18n, I18n, I18nOptions} from 'vue-i18n'
import {setHtmlPageLang} from "./utils";
import {useLocaleStoreWithOut} from "@/stores/modules/locale.ts";
import {LocaleDropdownType, LocaleType} from "../../../types";
// import { ipcRenderer } from 'electron';

export let i18n: I18n

const createI18nOptions = async (): Promise<I18nOptions> => {
    const localeStore = useLocaleStoreWithOut()
    const locale = localeStore.getCurrentLocale
    const localeMap = localeStore.getLocaleMap

    const localeFilePath = `/src/locales/${locale.lang}.ts`

    const existFile = await window.ipcRenderer.invoke('check-file-exist', localeFilePath)
    if (!existFile) {
        console.error(`locale file not found: ${localeFilePath}`)
        throw new Error(`locale file not found: ${localeFilePath}`)
    }
    const defaultLocal = await import(localeFilePath)
    const message = defaultLocal.default ?? {}

    setHtmlPageLang(locale.lang)

    return {
        legacy: false,
        locale: locale.lang,
        fallbackLocale: locale.lang,
        messages: {
            [locale.lang]: message
        },
        availableLocales: localeMap.map((v:LocaleDropdownType) => v.lang),
        sync: true,
        silentTranslationWarn: true,
        missingWarn: false,
        silentFallbackWarn: true
    }
};

export const setupI18n = async (app: App<Element>) => {
    const options = await createI18nOptions()
    i18n = createI18n(options) as I18n
    app.use(i18n)
}

const setI18nLanguage = (lang: LocaleType) => {
    const localeStore = useLocaleStoreWithOut()

    if (i18n.mode === 'legacy') {
        i18n.global.locale = lang
    } else {
        (i18n.global.locale as any).value = lang
    }
    localeStore.setCurrentLocale({
        lang: lang
    })
    setHtmlPageLang(lang)
}

export const changeLocale = async (locale: LocaleType) => {
    const globalI18n = i18n.global

    const langModule = await import(`../../locales/${locale}.ts`)

    globalI18n.setLocaleMessage(locale, langModule.default)

    setI18nLanguage(locale)
}