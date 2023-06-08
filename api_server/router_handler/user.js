// 数据库连接
const db = require('../db/index')
// 密码加密插件 bcryptjs@2.4.3
const bcrypt = require('bcryptjs')

exports.regUser = (req, res) => {
  const userinfo = req.body

  // 校验账号密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名或密码不能为空！')
  }

  // 查询账号是否重复
  const sqlStr = 'select * from my_db_01.ev_users where username=?'

  db.query(sqlStr, userinfo.username, (err, results) => {
    if (err) return res.cc(err)

    if (results.length > 0) {
      return res.cc('当前用户名已存在，请更换其他用户名')
    }

    // 密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    // 写入添加用户信息
    const sql = 'insert into my_db_01.ev_users set ?'

    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) {
          return res.cc('注册用户失败，请稍后再试')
        }

        res.cc('注册成功！', 1)
      }
    )
  })

  // res.send('reguser ok')
}

exports.login = (req, res) => {
  res.send('login ok')
}
