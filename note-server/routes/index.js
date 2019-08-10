const router = require('koa-router')()
const controller = require('../controllers/index')

router.prefix('/api')

// 账号相关
router.get('/getUser', controller.user.get)
router.post('/register', controller.user.register)
router.post('/login', controller.user.login)
router.post('/update', controller.user.update)
router.delete('/delete',controller.user.delete)

// 文章相关
router.post('/article/upload', controller.article.upload)
router.get('/article/getList', controller.article.getList)
router.get('/article/geDetail', controller.article.getDetail)

// 新闻相关
router.post('/news/uploadImg', controller.news.uploadImg)
router.post('/news/addNews', controller.news.addNews)
router.get('/news/getList', controller.news.getList)
router.get('/news/geDetail', controller.news.getDetail)


module.exports = router