const http = require('http')

const path = require('path')

const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {

    let url = req.url

    let fpath = url === '/' ? path.join(__dirname, '/case/index.html') : path.join(__dirname, '/case', url)

    res.setHeader('Content-Type', 'text/html;charset=utf-8')

    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
        if (err)  console.log('文件读取失败:' + url)
        res.end(dataStr)
    })

})
server.listen(7777, () => {
    console.log('服务器运行中...')
})
