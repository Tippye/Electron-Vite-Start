export const setHtmlPageLang=(lang: string)=>{
    document.querySelector('html')?.setAttribute('lang', lang)
}