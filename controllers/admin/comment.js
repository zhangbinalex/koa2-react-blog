const comment=require('../../models/Comment');
const Article=require('../../models/Article');
class Comment{
    static async get(ctx){
        const size=parseInt(ctx.query.size||20);
        const page=parseInt(ctx.query.page||1);
        let  comments= await comment.findAll({
            include:[{
                model:Article,
                attributes:['title']
            }],
            limit:size,
            offset:size*(page-1)
        });
        const res=comments.map((comment,index)=>{
            comment.dataValues.title= comment.article.title;
            return comment
        });
        ctx.body={ret:1,data:res}
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