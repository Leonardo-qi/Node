// 导入express模块
const express = require('express')

// 注册express
const app = express()

// cors解决接口跨域
const cors = require('cors')

// 校验表单插件
const joi = require("joi")

// 解析token
const expressJwt = require('express-jwt')

// 密码加密规则
const config = require('./config')



app.use(cors())

// 获取req body参数
app.use(express.urlencoded({ extended: false }))

// 使用中间件为res添加cc方法实现res.send
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }

  next()
})

// 解析token
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并注册路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误信息捕捉中间件
app.use((err, req, res, next) => {

  // 判断是否是因为表单校验导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)

  // 判断是否是因为token导致的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')

  res.cc(err)

})


// 启动服务器
app.listen(3007, () => {
  console.log('api server runing at http//127.0.0.1:3007...')
})
