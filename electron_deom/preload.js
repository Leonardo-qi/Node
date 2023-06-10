// const fs = require('fs')

// console.log('fs')

// fs.writeFile('/Users/qi/Desktop/qxq.text', 'qwheoqhwejq', () => {
//   console.log('done .')
// })

// 解构预加载使渲染进程可以使用node和访问主进程数据
const { contextBridge, ipcRenderer } = require('electron')

// 创建触发主进程 ipcMain.handle 方法
const handleSend = async (data) => {
  const res = await ipcRenderer.invoke('send-btn', data)
  console.log('文件创建成功')
}

// 将主进程方法或变量暴露到渲染进程可在html页面使用
contextBridge.exposeInMainWorld('myApi', {
  platform: process.platform,
  handleSend,
})
