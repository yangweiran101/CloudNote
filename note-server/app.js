const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const path = require('path')
const fs = require('fs');

const index = require('./routes/index')



// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
  "multipart": true,            //接收form表单数据
  formidable: {
    maxFieldsSize:10*1024*1024,
    multipart:true
    // uploadDir: path.join(__dirname,'public/images/'), // 设置文件上传目录
    // keepExtensions: true,       //保持源文件的扩展
    // onFileBegin: (name, file) => {   //文件保存之前的预处理
    //   file.path = file.name;      //保存文件名改为源文件的文件名，否则文件名随机
    // }
  }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
