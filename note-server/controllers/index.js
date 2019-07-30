const {
  getUserInfo,
  goRegister ,
  goLogin ,
  upDateUser ,
  uploadArticle,
  getArticleList,
  getArticleDetail
} = require('../schedule/index')

const user = {
    get: async ctx => {
        const res = await getUserInfo()
        ctx.body = {
            code:200,
            data: res,
            message: '操作成功'
        }
    },
    register: async ctx => {
        // ctx.body = ctx.request.body;
        // console.log('body赋值',ctx.body,ctx.request.body);
        try{
            const res = await goRegister(ctx.request.body)
            ctx.body = {
                code:200,
                data: res,
                message: '注册成功'
            }
        } catch(e) {
            ctx.body = {
                code:401,
                data: e,
                message: '注册失败'
            }
        }

    },
    login: async ctx => {
        ctx.body = ctx.request.body;
        console.log('body赋值',ctx.body,ctx.request.body);
        try{
            const res = await goLogin(ctx.body);
            ctx.body = {
                code:200,
                data: res,
                message: '登陆成功'
            }
        } catch(e) {
            ctx.body = {
                code:401,
                data: e,
                message: '登陆失败'
            }
        }
    },
    update: async ctx => {
        // console.log('body赋值',ctx.body,ctx.request.body);
        try{
            const res = await upDateUser(ctx.request.body);
            ctx.body = {
                code:200,
                data: res,
                message: '修改成功'
            }
        } catch(e) {
            ctx.body = {
                code:401,
                data: e,
                message: '修改失败'
            }
        }
    }
};

const article = {
  upload: async ctx => {
    ctx.body = ctx.request.body;
    console.log('文章',ctx.request.body);
    try {
      const res = await uploadArticle(ctx.body)
      ctx.body = {
        code:200,
        data: res,
        message: '发表成功'
      }
    } catch (e) {
      ctx.body = {
        code:401,
        data: e,
        message: '发表失败'
      }
    }
  },
  getList: async ctx => {
    // console.log('文章参数',ctx.query);
    const res = await getArticleList(ctx.query)
    try {
      ctx.body = {
        code:200,
        data: res,
        message: '获取成功'
      }
    } catch (e) {
      ctx.body = {
        code:200,
        data: e,
        message: '获取失败'
      }
    }
  },
  getDetail: async ctx => {
    const id = ctx.query.id;
    try {
      const res = await getArticleDetail(id);
      ctx.body = {
        code: 200,
        data: res,
        message: '获取成功'
      }
    } catch (e) {
      ctx.body = {
        code: 401,
        data: e,
        message: '获取失败'
      }
    }
  }
};

module.exports = {
  user,
  article
}