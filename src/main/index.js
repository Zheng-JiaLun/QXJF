import { app, BrowserWindow,dialog } from 'electron'
import "vuex-electron";
// import router from "../renderer/router/index";
// import '../renderer/store/index'
const ipcMain = require('electron').ipcMain

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let win
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
    webPreferences:{
      defaultFontFamily:{
        standard:"Microsoft YaHei",
      }
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
    // win = null
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
ipcMain.on('close', e=> {
  mainWindow.close()
  win.close()
});

/**
 * *****以下为下单页面配置*******
 * 
 **/ 

ipcMain.on('createdNewWin',()=>{
  if (win == null) {
    // win.hide();
    createNewPageWindow()
  }
})

//打开下单页面
ipcMain.on('openNewWin',function(event,arg){
  if (win == null) {
    createNewPageWindow()
  }
  win.show()//展示下单页面
  
  win.webContents.send('neiwai',arg)
  
})

// 关闭下单页面
ipcMain.on('closeXiadan',() => {
  win.hide()//隐藏下单页面
})

// 接收行情页面选中的合约代码
ipcMain.on('selectCode',(event,arg) => {
  if(win != null){
    win.focus()
    //把接受的合约代码发送给下单窗口进行渲染
    win.webContents.send('code',arg)
  }
})

function createNewPageWindow() {
  // const size = screen.getPrimaryDisplay().workAreaSize; // 获取显示器的宽高
  // const winSize = win.getSize(); // 获取窗口宽高
  win = new BrowserWindow({
    height: 410,
    useContentSize: true,
    width: 1400,
    backgroundColor: '#191B1F',
    //minWidth: 1305,
		//minHeight: 734,
    resizable: true,  // 窗口是否可以改变尺寸
    show: false, // 先不让窗口显示
    // alwaysOnTop:true,//始终在最顶层
    center:true,
    frame:false,  //无边框窗口
    movable:true, // 可否移动
    webPreferences:{
      defaultFontFamily:{
        standard:"Microsoft YaHei",
      },
      devTools: true, // 关闭调试工具
      webSecurity: true
    }
  });
  // 设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度 
  win.loadURL(winURL+'#/moni');
  // win.setPosition((size.width - winSize[0]) / 2, 350);
  // 监听渲染完成
  // if (process.env.NODE_ENV === 'development') {
  //   win.webContents.on('did-frame-finish-load', () => {
  //     win.webContents.once('devtools-opened', () => {
  //       // win.focus();
  //     });
  //     win.webContents.openDevTools();
  //   });
  // }

  // 监听窗口关闭
  win.on('close', () => {
    win = null;
  });
  global.newPage = {
    id: win.id
  };
}



//主进程
// ipcMain.on('MainMsgFromRender',function (event, arg) {
 
//   event.sender.send('RenderMsgFromMain',arg)
  
// })
 











app.on('ready', () => {
  createWindow()
  
})
// app.on('open-url',()=>{
//   createNewPageWindow()
// })
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
