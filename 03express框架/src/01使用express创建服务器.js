//导入express模块
const express = require('express')

//调用express方法创建服务器实例
const app = express()

/**
 * 通过实例方法get post，对get、pot请求进行监听参数和http模块参数用法相同
 * 
 */
app.get('/user', (req, res) => {
    res.send({
        code: '0000',
        data: [
            { name: '张三' },
            { name: '李四' },
        ],
        total: 2
    })
})

app.post('/user', (req, res) => {
    res.send('修改成功')
})

/**
 *  如何获取参数
 *  
 *      req.query   获取url查询参数
 *      req.params  获取url动态参数
 *  
 */
app.get('/', (req, res) => {
    res.send(req.query)
})
app.get('/user/:id', (req, res) => {
    res.send(req.params)
})



// 启动服务器
app.listen(80, () => {
    console.log('服务器正在运行...')
})