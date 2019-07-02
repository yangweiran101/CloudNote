const router = require('koa-router')()
const controller = require('../controllers/index')
const koaBody = require('koa-body');

router.prefix('/api')

// 账号相关
router.get('/getUser', controller.user.get)
router.post('/register', koaBody(), controller.user.register)
router.post('/login', koaBody(), controller.user.login)
router.post('/update', koaBody(), controller.user.update)

// 文章相关
router.post('/article/upload',koaBody(), controller.article.upload)
router.get('/article/getList', controller.article.getList)
router.get('/article/geDetail', controller.article.getDetail)


module.exports = router