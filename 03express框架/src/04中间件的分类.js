const express = require('express')
const app = express()

/**
 * 
 *      中间件的分类
 *      
 *      1、express.static()     放置静态资源
 * 
 *      2、express.json()       解析客户端传的json数据
 * 
 *      3、express.urlencoded   解析客户端传的urlencoded数据
 * 
 * 
 *      都使用req.body来接收
 * 
 * 
 *      老版本没有express.urlencoded的使用如下方法：
 * 
 *      const parser = require('body-parser')
 * 
 *      app.use(parser.urlencoded({encoded:false}))
 * 
 *      导入body-parser模块并注册和express.urlencoded方法差不多
 * 
 * 
*/

app.use(express.json())

app.post('/user', (req, res) => {
    console.log(req.body)
    res.send('ok')
})

app.use(express.urlencoded({ extended: false }))
app.post('/age', (req, res) => {
    console.log(req.body)
    res.send('ok')
})



app.listen(80, () => {
    console.log('服务器正在运行...');
})