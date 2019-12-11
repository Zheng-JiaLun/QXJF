import { app, BrowserWindow,dialog } from 'electron'
import '../renderer/store/index'
const ipcMain = require('electron').ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 850,
    useContentSize: true,
    width: 1530,
    backgroundColor: '#191B1F',
    //minWidth: 1305,
		//minHeight: 734,
    resizable: true,  // 窗口是否可以改变尺寸
    center:true,
    frame:false,  //无边框窗口
    movable:true, // 可否移动
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('max', e => {
	if (mainWindow.isMaximized()) {
		mainWindow.unmaximize()
	} else {
		mainWindow.maximize()
	}
});
ipcMain.on('close', e=> mainWindow.close());
//主进程
ipcMain.on('MainMsgFromRender',function (event, arg) {
 
  event.sender.send('RenderMsgFromMain',arg)
  
})
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/*
*
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
