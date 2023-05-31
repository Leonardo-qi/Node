const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))


// cors插件     解决跨域问题
const cors = require('cors')
app.use(cors())

const router = require('./06router')
app.use('/api', router)

app.listen(80, () => {
    console.log('server...  http//127.0.0.1')
})
