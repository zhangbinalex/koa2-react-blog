const security=require('../../models/security');

class Security{
    static async logined_info(ctx){
        /*ctx.body = {ret:1,msg:'已登陆',username:123};*/
        console.log(ctx.session)
        if (typeof ctx.session.user === 'undefined' ) {
        ctx.body = {ret:0,msg:'未登录'};
        }else {
            ctx.body = {ret:1,msg:'已登陆',username:ctx.session.user.username};
        }
    }

    static async logout(ctx){
        ctx.session=null;
        ctx.body={ret:1,msg:'注销成功！'}
    }

    static async login(ctx){
        let {username,password}=ctx.request.body;
        let user=await security.findOne({
            where:{
                username
            }
        });
        if(!user){
            ctx.body={ret:0,msg:'用户名不存在！'};
        }else {
            if(user.password===password)
            {
                ctx.session.user=user;
                ctx.body={ret:1,msg:'登陆成功！'};
            }else {
                ctx.body={ret:0,msg:'密码错误！'};
            }
        }
    }
}
module.exports=Security;



