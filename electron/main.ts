import {app, BrowserWindow, nativeTheme} from 'electron'
import path from 'node:path'
import {initIpcManager} from "./ipcManager.ts";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log("运行环境：", isDevelopment?"dev":"pro")

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height:680,
    minWidth: 760,
    minHeight: 480,
    resizable: true, //是否允许用户调整窗口大小
    movable: true, // 是否允许用户移动窗口，默认为 true
    minimizable: true, // 是否显示最小化按钮，默认为 true
    maximizable: true, // 是否显示最大化/还原按钮，默认为 true
    closable: true, // 是否显示关闭按钮，默认为 true
    fullscreenable: true, // 是否允许全屏，默认为 true
    titleBarStyle: 'hiddenInset', // 在 macOS 上可选 'hidden' 或 'hiddenInset' 来改变标题栏样式
    frame: false, // 是否显示窗口边框，默认为 true，在 macOS 上可以隐藏边框以实现自定义标题栏效果
    transparent: true,
    center: true, // 是否在屏幕中央显示新窗口，默认为 false
    alwaysOnTop: false, // 是否总是显示在其他窗口之上，默认为 false
    webPreferences: {
      nodeIntegration: true, // 是否启用 Node.js 集成，默认为 false，推荐使用 contextIsolation 和 preload 而不是直接启用 nodeIntegration
      contextIsolation: true, // 是否开启上下文隔离，默认为 false，为了安全考虑，建议设置为 true，并使用 preload 脚本注入全局变量
      // enableRemoteModule:true,
      preload: path.join(__dirname, 'preload.js'), // 预加载脚本路径，可以在渲染进程中注入全局变量和方法
      sandbox: false, // 是否启用沙箱，默认为 false，启用后会限制渲染进程的能力
      devTools: true, // 是否默认打开开发者工具，默认为 false
      // 其他 WebPreferences 参数...
    },
    vibrancy: 'ultra-dark', // macOS 原生app背景深色毛玻璃效果（默认会被网页背景遮挡住）
    visualEffectState: 'active',
    backgroundColor: '#00000000',
    show: true, // 是否立即显示窗口，默认为 true，若设为 false，需要手动调用 win.show() 来显示窗口
  })

  if(isDevelopment) win.webContents.openDevTools()

  // Test active push message to Renderer-process.

  initIpcManager(win)

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
    win?.webContents.send("app:changeDarkmode",nativeTheme.shouldUseDarkColors)
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
    app.quit()
    win = null
  // }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

nativeTheme.on('updated', () => {
  win?.webContents.send("app:changeDarkmode",nativeTheme.shouldUseDarkColors)
})

app.whenReady().then(createWindow)
