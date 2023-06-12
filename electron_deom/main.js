const path = require('path')
const fs = require('fs')

// 从electron 中解构出相应模块
const {
  app,
  BrowserWindow,
  contextBridge,
  ipcRenderer,
  ipcMain,
  dialog,
  globalShortcut,
  Menu,
  Tray
} = require('electron')

// 设置可以保留窗口状态
const WinState = require('electron-win-state').default

// 菜单数组
let mainMenu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
      { label: 'Item 1'},
      { label: 'Item 2', submenu: [ { label: 'Sub Item 1'} ]},
      { label: 'Item 3'},
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo'},
      { role: 'redo'},
      { role: 'copy'},
      { role: 'paste'},
    ]
  },
  {
    label: 'Actions',
    submenu: [
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      },
      {
        role: 'toggleFullScreen'
      },
      {
        label: 'Greet',
        click: () => { console.log('Hello from Main Menu') },
        accelerator: 'Shift+Alt+G'
      }
    ]
  }
])

// 上下文菜单数组
let contextMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'editMenu' }
])

// 托盘菜单数组
let trayMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'quit' }
])

// 初始化托盘
function createTray(win) {
  tray = new Tray('1.jpg')
  tray.setToolTip('Tray details')

  tray.on('click', e => {

    if (e.shiftKey) {
      app.quit()
    } else {
      win.isVisible() ? win.hide() : win.show()
    }
  })

  tray.setContextMenu(trayMenu)
}


// 创建 BrowserWindow 实例：桌面应用窗口
const createWindow = () => {

  // 创建保留窗口状态实例
  const winState = new WinState({
    defaultWidth: 800,
    defaultHeight: 500,
  })

  const win = new BrowserWindow({
    // 解构不能使用width
    ...winState.winOptions,
    // width: 800,
    // height: 600,
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

  // 打开开发者工具
  const wc = win.webContents

  // 打开选择文件窗口
  wc.on('context-menu', (e, params) => {

    // 各种打开窗口
    // dialog.showOpenDialog({
    //   buttonLabel: 'ok',
    //   defaultPath: app.getPath('desktop'),
    //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    // }).then((result) => {
    //   console.log(result.filePaths)
    // })

    // dialog.showSaveDialog({}).then(result => {
    //   console.log(result.filePath)
    // })

    // const answers = ['Yes', 'No', 'Maybe']
    // dialog.showMessageBox({
    //   title: 'Message Box',
    //   message: 'Please select an option',
    //   detail: 'Message details.',
    //   buttons: answers
    // }).then(({ response }) => {
    //   console.log(`User selected: ${answers[response]}`)
    // })


    // 上下文menu
    contextMenu.popup(contextMenu)

  })

  // 挂载
  winState.manage(win)


  // 快捷键，没啥可说就是api直接调用就行
  globalShortcut.register('CommandOrControl+Y', () => {
    console.log('User pressed G with a combination key')

    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+Y')
  })

  Menu.setApplicationMenu(mainMenu)

  // 创建托盘
  createTray(win)

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

  // fs.writeFile(`/Users/qi/Desktop/${data.fileName}.text`, data.value, () => {})

  // 选择创建文件路径
  dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
  }).then((result) => {

    const path = result.filePaths[0]

    fs.writeFile(`${path}\\${data.fileName}.text`, data.value, () => { })
  })

})
