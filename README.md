# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

# 开发指南
- 网页部分全部放在`/src`目录中
- Vue组件使用setupXXX进行配置，默认放在`/src/plugins`目录
- ElementPlus实现了按需引入，可在项目中直接使用
- electron部分全部放在`/electron`目录中，项目默认启动项为`/electron/main.ts`
- `/electron/ipcManager.ts`用于定义调用原生接口的函数
- 需要修改项目名的地方: [/package.json](package.json)、[/.env.development](.env.development)、[/.env.production](.env.production)
## 路由
`/src/router`
- `component: Layout`,children项为放在Layout框架内的页面
- 路由到未知地址默认跳转到`/home`,已在`router.beforeEach`中设置

## 状态管理库
`/src/stores`
- 使用[pinia](https://pinia.vuejs.org/zh/)进行开发
- 用法参考`/src/stores/modules/app.ts`

## 调用原生API
网页部分(`/src`)使用`await window.ipcRenderer.invoke('xxx', params)`调用`/electron/ipcManager.ts`的函数

ipcManager.ts中定义`ipcMain.handle("xxx", (_event, params) => { return result; });`

> 必须要有[/electron/preload.ts](electron/preload.ts)中的3 - 23行内容
<details>
<summary>preload.ts部分</summary>
<code>
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer));
   
function withPrototype(obj: Record<string, any>) {
   const protos = Object.getPrototypeOf(obj)
   for (const [key, value] of Object.entries(protos)) {
   if (Object.prototype.hasOwnProperty.call(obj, key)) continue
       if (typeof value === 'function') {
         // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
         obj[key] = function (...args: any) {
           return value.call(obj, ...args)
         }
       } else {
         obj[key] = value
       }
   }
   return obj
}
</code>
</details>

参考[/src/plugins/I18n/index.ts](src/plugins/I18n/index.ts)中`createI18nOptions`函数的`const existFile`处和[/electron/ipcManager.ts](electron/ipcManager.ts)中`ipcMain.handle('check-file-exist'...)`部分

## 监听原生状态

在[/electron/main.ts](electron/main.ts)或者其他electron目录下的ts文件中使用
```typescript
// win是new BrowserWindow()返回的对象
win?.webContents.send("xxx", params)
```
在网页部分使用
```typescript
window.ipcRenderer.on("xxx", (_event, params) => {
    console.log(params);
})
```
在`console.log`处可以使用获取到的数据进行处理
参考深色模式切换
[/electron/main.ts](electron/main.ts)中
```typescript
nativeTheme.on('updated', () => {
   win?.webContents.send("app:changeDarkmode",nativeTheme.shouldUseDarkColors)
})
```
[/src/stores/modules/app.ts](src/stores/modules/app.ts)中
```typescript
window.ipcRenderer.on("app:changeDarkmode", (_e: any, darkmode: boolean) => {
   const store = useAppStore();
   store.changeDarkmode(darkmode)
})
```