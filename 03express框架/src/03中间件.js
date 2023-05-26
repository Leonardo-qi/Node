const { log } = require('console')
const express = require('express')
const app = express()

app.use((req,res,next)=>{
    req.time = new Date()
    next()
})

app.get('/user',(req,res)=>{
    // log("get请求，路径:'/user'")
    throw new Error('发生错误...')
    res.send(req.time)
})

app.use((err,req,res,next)=>{
    res.send(err.messahge)
})


app.listen(80,()=>{
    log('服务已经运行')
})


/**
 *      1、通过app.use进行注册的中间件方法是全局的所有请求都会走
 * 
 *      2、在app.get('',()=>,(req,res)=>{})、或post中为局部的中间件只有在当前路径请求会走 
 * 
 *      3、中间件的注册一定要在路由之前
 * 
 *      4、错误中间件的注册要在路由之后
 * 
 */