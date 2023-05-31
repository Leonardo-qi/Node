const express = require('express')
const router =  express.Router()

router.get('/get',(req,res)=>{
    res.send({
        status:1,
        msg:'success',
        data:req.query
    })
})

router.post('/post',(req,res)=>{
    res.send({
        status:1,
        msg:'success',
        data:req.body
    })
})


module.exports = router