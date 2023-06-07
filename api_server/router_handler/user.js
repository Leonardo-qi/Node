const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.regUser = (req, res) => {
  const userinfo = req.body

  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空！' })
  }

  const sqlStr = 'select * from my_db_01.ev_users where username=?'

  db.query(sqlStr, userinfo.username, (err, results) => {
    if (err) return res.send({ status: 1, message: err.message })

    if (results.length > 0) {
      return res.send({
        status: 1,
        message: '当前用户名已存在，请更换其他用户名',
      })
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    const sql = 'insert into my_db_01.ev_users set ?'

    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        if (err) return res.send({ status: 1, message: err.message })

        if (results.affectedRows !== 1) {
          return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
        }

        res.send({ status: 0, message: '注册成功！' })
      }
    )
  })

  // res.send('reguser ok')
}

exports.login = (req, res) => {
  res.send('login ok')
}
