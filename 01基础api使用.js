// fs模块       fs对文件进行读写        api:    readFile(读取文件)、writeFile(写入文件)
const fs = require('fs')

// __dirname    注：在读取文件路径时要使用 path.jion(__dirname,'路径')，__dirname不会出现错误始终是当前目录路径

// path模块     path对路径的处理        api:    join(拼接路径)、basename(获取文件名/可配置去掉扩展名)、extname(获取文件扩展名)
const path = require('path')

// http模块     http模块用来搭建服务
const http = require('http')
/**
 * http模块api如下:
 * 1、createServer                      创建服务器实例
 * 2、on                                服务器监听事件
 *      (1)req                          客户端数据      req.url客户端请求地址       req.method请求方式
 *      (2)res                          服务器相应      res.end(参数) 响应数据      res.setHeader('Content-Type','text/html;charset=utf-8')解决返回乱码的问题
 * 3、listen（端口号，callback）         启动服务 
 */
const server = http.createServer()
server.on('request', (req, res) => { })
server.listen(80, () => {
    console.log('启动')
})