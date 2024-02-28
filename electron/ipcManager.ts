import {BrowserWindow, ipcMain, screen} from "electron";
import * as fs from "fs";

export const initIpcManager = (win: BrowserWindow) => {
    ipcMain.handle('check-file-exist', (_, filePath: string) => {
        filePath = fs.realpathSync(process.cwd() + '/' + filePath)
        return fs.existsSync(filePath);
    })

    // ipcMain.handle('get-file-content', async (_, filePath: string) => {
    //     try {
    //         return await fs.readFile(filePath, 'utf-8');
    //     } catch (e: any) {
    //         if (e.code === 'ENOENT')
    //             return '';
    //         throw e;
    //     }
    // })

    // 最小化
    ipcMain.handle('min', () => win.minimize());

    // 最大化
    ipcMain.handle('max', (_event,isMax:boolean)=>{
        console.log('max')
        if(isMax){
            win!.unmaximize();
        }else{
            win!.maximize();
        }
        return isMax
    })

    // 移动窗口----start
    ipcMain.handle("win-start", () => {
        console.log('win-start')
        const winPosition = win!.getPosition();
        const cursorPosition = screen.getCursorScreenPoint();
        let x = cursorPosition.x - winPosition[0];
        let y = cursorPosition.y - winPosition[1];
        return JSON.stringify({x, y});
    });
    ipcMain.handle("win-move", (_event, params) => {
        console.log('win-move')
        const param = JSON.parse(params);
        win!.setPosition(param.x, param.y, true);
    });
    // 移动窗口----end
}