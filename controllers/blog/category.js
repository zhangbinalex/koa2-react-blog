const category=require('../../models/Category');
const article=require('../../models/Article');
const tag=require('../../models/Tag');
const Comment=require('../../models/Comment');

class Category{
    static async get_top_category(ctx){
        const top_category=await  category.findAll({
            attributes: [['cid','value'],['cname','label'],'pic_url','icon'],
            where:{
                pid:1
            }
        });
        ctx.body={ret:1,data:top_category}
    }

    static async get_category_and_article(ctx){
        let size=parseInt(ctx.query.size)||5;
        let page=parseInt(ctx.query.page)||1;
        const cid=parseInt(ctx.query.id);
        let subCategory=await category.findAll({
            attributes: [['cid','value'],['cname','label'],'icon'],
            where:{
                pid:cid
            }
        });
        let articles=await article.findAll({
            include:[tag,category,Comment],
            limit:size,
            offset:(page-1)*size,
            where:{
                cid:[cid,...subCategory.map((sub)=>{
                    return sub.dataValues.value
                })]
            }
        });
        if(articles){
            articles=articles.map((article)=>{
                article.dataValues.comment_count=article.dataValues.comments.length||0;
                article.dataValues.tag=article.dataValues.tags.map((tag)=>{
                    return tag.tname
                });
                article.dataValues.cname=article.category?article.category.cname:'未知分类'
                return article
            })
        }

        ctx.body={ret:1,child:subCategory,data:articles}
    }
}


module.exports=Category;