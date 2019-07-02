const pool = require('../schedule/pool')

module.exports = {
    // 登陆相关
    getUserInfo() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('select * from user', (err, results) => {
                  connection.release();
                    if (err) reject(err)
                    console.log(1, results);
                    var userList = [];
                    results.forEach(val => {
                        userList.push({username:val.username})
                    })
                    resolve(userList)
                })
            })
        })
    },
    goRegister(body) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                // 连接错误，抛出错误
                if (err) throw err
                // 先查询手机号是否已注册
                var querySql = `SELECT*FROM user WHERE mobile = ${body.mobile}`
                connection.query(querySql,(err, results) => {
                    // console.log(3,results);
                    if (err) throw err
                    // 条件查询有数据就返回‘该手机号已注册’
                    if (results.length !== 0) reject('该手机号已注册')
                    else {
                        // 条件查询无数据进行插入数据操作
                        var addSql = `INSERT INTO user set ?`;
                        connection.query(addSql, body, (err, results) => {
                          connection.release();
                            if (err) reject(err)
                            // console.log(2, results);
                            resolve(results)
                        })
                    }
                })
            })
        })
    },
    goLogin(body) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err,connection) => {
                // 连接错误，抛出错误
                if (err) throw err
                var querySql = `SELECT*FROM user WHERE mobile = ${body.mobile}`
                connection.query(querySql,(err,results) => {
                    connection.release();
                    // console.log(results);
                    if (results.length === 0) reject('该手机号未注册'); // 手机号未在数据库里面
                    else if (results[0].password == body.password) resolve(results); // 手机号密码正确
                    else reject('密码错误，请重试') // 手机号已注册，但密码错误
                })
            })
        })
    },
    upDateUser(body) {
        return new Promise((resolve,reject) => {
            pool.getConnection((err,connection) => {
                // 连接错误，抛出错误
                if (err) throw err
                var querySql = `SELECT*FROM user WHERE mobile = ${body.mobile}`
                connection.query(querySql,(err,results) => {
                    if (results.length === 0) reject('该手机号未注册'); // 手机号未在数据库里面
                    else if (results[0].password != body.password) reject('密码错误，请重试'); // 手机号密码错误
                    else {
                        var updateSql = `UPDATE user SET password=${body.newPassword} WHERE mobile = ${body.mobile}`
                        connection.query(updateSql,(err,results) => {
                            connection.release();
                            if (err) throw err
                            resolve(body);
                        })
                    } // 修改密码操作
                })
            })
        })
    },

    // 文章相关
    uploadArticle(body) {
      return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
          connention.release();
          // 连接错误，抛出错误
          if (err) throw err
          var addSql = 'INSERT INTO article set ?'
          connection.query(addSql,body,(err, results) => {
            if (err) reject(body);
            resolve(results)
            // console.log('获取',body,err,results);
          })
        })
      })
    },
    getArticleList() {
      return new Promise((resolve, reject) => {
          pool.getConnection((err, connention) => {
            connention.release();
            if (err) throw err
            var querySql = 'select * from article order by id desc'
            connention.query(querySql,(err,results) => {
              connention.release();
              if (err) reject(err)
              resolve(results)
            })
          })
      })
    },
    getArticleDetail(id) {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connention) => {
          if (err) throw err
          var querySql = `SELECT*FROM article WHERE articleId = ${id}`
          connention.query(querySql,(err,results) => {
            connention.release();
            if (err) reject(err);
            console.log('文章详情',results);
            if (results.length == 0) {
              reject('未找到数据');
            } else {
              resolve(results[0])
            }
          })
        })
      })
    }
}