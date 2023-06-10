const path = require('path')
const fs = require('fs')

// 从electron 中解构出相应模块
const {
  app,
  BrowserWindow,
  contextBridge,
  ipcRenderer,
  ipcMain,
} = require('electron')

// 创建 BrowserWindow 实例：桌面应用窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //解决在渲染进程使用node
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  // 引入html页面在应用窗口显示
  win.loadFile('index.html')

  // 打开应用窗口 控制模板  浏览器f12
  win.webContents.openDevTools()
}

// 忘了干嘛的
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 主进程生命周期  判断如果是mac系统退出关闭程序
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 渲染进程呢和主进程通信  可在渲染进程使用ipcRenderer.invoke触发send-btn事件
ipcMain.handle('send-btn', (e, data) => {
  fs.writeFile(`/Users/qi/Desktop/${data.fileName}.text`, data.value, () => {})
})
