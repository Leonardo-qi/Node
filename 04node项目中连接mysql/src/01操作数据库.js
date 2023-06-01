const mysql = require('mysql')
const express = require('express')
const app = express()

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

function callSuccess(err, res, str) {
    if (err) return console.log(err.message)
    if (res.affectedRows === 1) console.log(str)
}

/* 测试数据库连接是否成功
db.query('select 1',(err,res)=>{
    if(err) return console.log(err.message)
    console.log(res)
}) */

// 插入
/* const data = { username: 'wudiaoteman', password: '1748003813' }
const sqlstr = 'INSERT INTO users SET ?'

db.query(sqlstr, data, (err, res) => {
    callSuccess(err, res, '插入成功')
}) */

// 查询
/* const sqlstr = 'select * from users'

db.query(sqlstr, (err, res) => {
    if (err) return console.log(err.message)
    console.log(res)
}) */

// 更新
/* const data = { id:10,username: 'qixiangquan', password: '123' }
const sqlstr = 'update users SET ? where id = ?'

db.query(sqlstr, [data,10], (err, res) => {
    callSuccess(err, res, '更新成功')
}) */

// 删除
// const sqlstr = 'delete from users where id = ?'
// db.query(sqlstr, 10, (err, res) => {
//     callSuccess(err, res, '删除成功')
// }) 


app.use(express.urlencoded({ extended: false }))


app.post('/user_add', (req, res) => {

    const sqlstr = 'insert into users set ?'

    db.query(sqlstr, req.body, (err, result) => {
        if (err) return res.send(err.message)
        if (result.affectedRows === 1) res.send('保存成功')
    })

})


app.listen(80, () => {
    console.log('serve runing...')
})

