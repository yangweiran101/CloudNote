const pool = require('../schedule/pool')

module.exports = {
    // 登陆相关
    getUserInfo(query) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw err;
              console.log(query);
              connection.query(`select * from user limit ${(query.page - 1)*query.size},${query.size}`, (err, results) => {
                  connection.release();
                  if (err) reject(err)
                  console.log('回调',results);
                  var userList = [];
                      results.forEach(val => {
                          userList.push({username:val.username,mobile:val.mobile,id:val.id})
                      });
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
                    else if (results[0].password == body.password) resolve([{
                      id: results[0].id,
                      mobile: results[0].mobile,
                      username: results[0].username
                    }]); // 手机号密码正确
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
          connection.release();
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
    getArticleList(query) {
      return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            // console.log(query.page,query.size,(query.page - 1)*query.size);
            if (err) throw err
            var querySql = `select * from article order by id desc limit ${(query.page - 1)*query.size},${query.size}`
            connection.query(querySql,(err,results) => {
              connection.release();
              if (err) reject(err)
              resolve(results)
            })
          })
      })
    },
    getArticleDetail(id) {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) throw err
          var querySql = `SELECT*FROM article WHERE articleId = ${id}`
          connection.query(querySql,(err,results) => {
            connection.release();
            if (err) reject(err);
            console.log('文章详情',results,id);
            if (results.length == 0) {
              reject('未找到数据');
            } else {
              resolve(results[0])
            }
          })
        })
      })
    },

    // 工具
    getCount(form) {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log('名字',form);
          connection.query(`select count(id) from ${form}`, (err, results) => {
            console.log('数量',results);
            connection.release();
            if (err) reject(err)
            resolve(results[0]['count(id)'])
          })
        })
      })
    },
}