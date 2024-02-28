export interface Language {
    el: Recordable
    name: string
}

export interface LocaleDropdownType {
    lang: LocaleType
    name?: string
    elLocale?: Language
}

export type SystemTheme = 'light' | 'dark' | 'auto'

export type LocaleType = 'en' | 'zh-CN'
