const express = require('express')

const app = express()

/**
 *  app.use参数：
 *              
 *              第一个，在对外提供时添加访问路径
 *              第二个，访问路径
 * 
 * 如：
 *  app.use(express.static('文件路径'))             访问路径:http://127.0.0.1/文件路径
 * 
 *  app.use('/file', express.static('文件路径'))    访问路径:http://127.0.0.1/file/文件路径
 */

app.use(express.static('文件路径'))
app.use('/file', express.static('文件路径'))
