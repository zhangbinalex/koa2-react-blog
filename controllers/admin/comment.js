const comment=require('../../models/Comment');
const Article=require('../../models/Article');
class Comment{
    static async get(ctx){
        if(ctx.query.aid){
            let aid=ctx.query.aid;
            const comments=await  comment.findAll({
                include:[{
                    model:Article,
                    attributes:['content'],

                }],
                where:{
                    aid
                }
            })
        }else {
            const size=parseInt(ctx.query.size||20);
            const page=parseInt(ctx.query.page||1);
            const comments= await comment.findAll({
                include:[{
                    model:Article,
                    attributes:['title']
                }],
                limit:size,
                offset:size*(page-1)
            });
            const res=comments.map((comment)=>{
                comment.dataValues.title= comment.article.title;
                return comment
            });
            ctx.body={ret:1,data:res}
        }

    }

    static async delete(ctx){
        const cmid=ctx.request.body.cmid;
        await  comment.destroy({
            where:{
                cmid
            }
        });
        ctx.body={ret:1,msg:'评论删除成功！'}
    }
}

module.exports=Comment;