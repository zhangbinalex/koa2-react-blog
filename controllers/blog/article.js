const Arti=require('../../models/Article');
const Tag=require('../../models/Tag');
const Category=require('../../models/Category');
const Comment=require('../../models/Comment');
class Article{
    static async search_title(ctx){
        let key=ctx.query.key;
        let size=parseInt(ctx.query.size)||20;
        let page=parseInt(ctx.query.page)||1;
        let total=await  Arti.count();
        let articles=await  Arti.findAll({
            include:[Tag,Category,Comment],
            where:{
                title:{
                    $like:'%'+key+'%'
                }
            },
            limit:size,
            offset:(page-1)*size
        });
        console.log(articles)
        if(articles){
            var res=articles.map((article)=>{
                article.dataValues.tag=article.tags.map((tag)=>{
                    return tag.tname
                });
                article.dataValues.cname=article.category?article.category.cname:'未知分类';
                article.dataValues.comment_count=article.comments.length;
                return article
            })
        }
        ctx.body={data:res,ret:1,total}
    }

    static  async get_by_tag(ctx){
        let tid=ctx.query.id;
        let size=parseInt(ctx.query.size)||20;
        let page=parseInt(ctx.query.page)||1;
        let total=await  Arti.count();
        let articles=await  Arti.findAll({
            include:[{
                model:Tag,
                where:{
                    tid
                }
            },Category,Comment],
            limit:size,
            offset:(page-1)*size
        });
        if(articles){
            var res=articles.map((article)=>{
                article.dataValues.tag=article.tags.map((tag)=>{
                    return tag.tname
                });
                article.dataValues.cname=article.category?article.category.cname:'未知分类';
                article.dataValues.comment_count=article.comments.length;
                return article
            })
        }
        ctx.body={data:res,ret:1,total}
    }
}

module.exports=Article;