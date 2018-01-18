const comment = require('../../models/Comment');

class Comment{
    static async add(ctx){
        let {content,aid,username,avatar,type,pid=0,uid=0}=ctx.request.body;
        await  comment.create({
            content,aid,username,avatar,type,pid,uid
        });
        ctx.body={ret:1,msg:'评论添加成功！'}
    }

    static  async get(ctx){
        let aid=ctx.query.aid;
        let comments=await comment.findAll({
            where:{
                aid
            }
        });
        for(let c of comments){
            if(c.dataValues.pid){
                let pc=await comment.findOne({
                    attributes:['username'],
                    where:{
                        pid:c.dataValues.pid
                    }
                })
                let pUsername=pc.dataValues.username
                c.dataValues.pUsername=pUsername
            }
        }

        ctx.body={ret:1,data:comments}
    }
}

module.exports=Comment;