const {
  getUserInfo,
  goRegister ,
  goLogin ,
  upDateUser ,
  deletUser,
  uploadArticle,
  getArticleList,
  getArticleDetail,
  getCount,
  uploadNews,
  getNewsList,
  getNewsDetail
} = require('../schedule/index');
const fs = require("fs")
const path = require('path')
const createHash = require('../public/javascripts/createHash');
const uploadUrl = "http://localhost:3000/upload";

const user = {
    get: async ctx => {
      try{
        const list = await getUserInfo(ctx.query)
        const count = await getCount('user')
        console.log('内容',list, count);
        let res = {
          list: list,
          total: count
        }
        ctx.body = {
            code:200,
            data: res,
            message: '操作成功'
        }
      } catch (e) {
        ctx.body = {
          code:401,
          data: e,
          message: '获取失败'
        }
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
    },
    delete: async ctx => {
      try{
        const res = await deletUser(ctx.query)
        console.log('内容',res);
        ctx.body = {
          code:200,
          data: res,
          message: '操作成功'
        }
      } catch (e) {
        ctx.body = {
          code:401,
          data: e,
          message: '删除失败'
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
const news = {
  uploadImg: async ctx => {
    // ctx.body = ctx.request.body;
    console.log('文件',ctx.request.files.file);
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const hashcode = createHash(32);
    let filePath = path.resolve( __dirname, "../public/upload/");
    let fileResource = filePath + `/${hashcode + file.name}`;
    if(!fs.existsSync(filePath)) {
      fs.mkdir(filePath,(err)=>{
        if (err) {
          throw new Error(err)
        } else {
          let upstream=fs.createWriteStream(fileResource);
          reader.pipe(upstream);
          ctx.body = {
            code:200,
            data: uploadUrl + `/${hashcode + file.name}`,
            message: '上传测试'
          }
        }
      })
    } else {
      let upstream=fs.createWriteStream(fileResource)
        reader.pipe(upstream);
      ctx.body = {
        code:200,
        data: uploadUrl + `/${hashcode + file.name}`,
        message: '上传测试'
      }
    }
  },
  addNews: async ctx => {
    ctx.body = ctx.request.body;
    console.log('新闻',ctx.request.body);
    try {
      const res = await uploadNews(ctx.body)
      ctx.body = {
        code:200,
        data: res,
        message: '添加成功'
      }
    } catch (e) {
      ctx.body = {
        code:401,
        data: e,
        message: '添加失败'
      }
    }
  },
  getList: async ctx => {
    // console.log('文章参数',ctx.query);
    const res = await getNewsList(ctx.query)
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
      const res = await getNewsDetail(id);
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
  article,
  news
}