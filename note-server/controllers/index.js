const { getUserInfo, goRegister ,goLogin ,upDateUser} = require('../schedule/index')

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
        ctx.body = ctx.request.body;
        console.log('body赋值',ctx.body,ctx.request.body);
        try{
            const res = await upDateUser(ctx.body);
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
}

module.exports = {
    user
}