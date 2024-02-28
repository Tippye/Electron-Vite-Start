/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly APP_TITLE: string
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}