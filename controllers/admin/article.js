
const Arti=require('../../models/Article');
const Tag=require('../../models/Tag');
const Category=require('../../models/Category');
const Comment=require('../../models/Comment');

async function findParents(resArr,obj) {
    const  pCategory=await Category.findOne({
        where:{ cid : obj.dataValues.pid }
    });
    if (pCategory&&pCategory.dataValues.cid!==1){
        resArr.unshift(pCategory.dataValues.cid);
        return  findParents(resArr,pCategory)
    }else {
        return resArr
    }
    /*if(pCategory){
        if(pCategory.dataValues.cid!==1){
            resArr.unshift(pCategory.dataValues.cid);
            return  findParents(resArr,pCategory)
        }else {
            return resArr
        }
    }else {
        return resArr
    }*/
}


class Article {
    static async add(ctx){
        let postData=ctx.request.body;
        let {title,content,author,keywords,description,is_original=1,is_top=0,is_show=1,article_tag=[],category}=postData;
        category=JSON.parse(category);
        let cid=category[category.length-1];

        //根据传来的标签数组查询标签
        let tags= await Tag.findAll({
            where:{
                tid:JSON.parse(article_tag).map((tag)=>{
                    return tag.tid
                })
            }
        });
        //添加文章
        let article=await Arti.create({
            title,content,author,keywords,description,is_original,is_top,is_show,cid
        });
        //将文章和标签关联
        await  article.addTag(tags);
        ctx.body={ret:1,msg:'文章添加成功！'}
    }

    static async update(ctx){
        let postData=ctx.request.body;
        let {aid,content,title,author,keywords,description,is_original=1,is_top=0,is_show=1,article_tag=[],category}=postData;
        category=JSON.parse(category);
        let cid=category[category.length-1];
        //根据传来的标签数组查询标签
        let tags= await Tag.findAll({
            where:{
                tid:JSON.parse(article_tag).map((tag)=>{
                    return tag.tid
                })
            }
        });
        //更新文章
        await Arti.update({
            title,author,content,keywords,description,is_original,is_top,is_show,cid
        },{
            where:{aid}
        });
        let article=await Arti.findOne({
            where:{aid}
        });
        //将文章和标签关联
        await  article.setTags(tags);
        ctx.body={ret:1,msg:'文章更新成功！'}
    }

    static async delete(ctx){
        let aid=ctx.request.body.aid;
        await Arti.destroy({
            where:{
                aid
            }
        });
        await Comment.destroy({
            where:{
                aid
            }
        });
        ctx.body={ret:1,msg:'文章删除成功！'}
    }

    static async get(ctx){
        //单篇文章查询
        if(ctx.query.aid){
            let aid=ctx.query.aid;
            let article=await Arti.findOne({
                include: [Category,Tag,Comment],
                where:{aid}
            });
            if(ctx.query.type==='click') await article.increment('click');
            article.dataValues.comment_count=article.comments.length;
            article.dataValues.categoryArr=article.dataValues.category&&article.dataValues.cid>1?
                await findParents([article.dataValues.cid],article.dataValues.category):[];
            ctx.body={data:article,ret:1}
        }else {
            //文章列表分页查询
            let size=parseInt(ctx.query.size)||20;
            let page=parseInt(ctx.query.page)||1;

            let total=await Arti.count();
            let articles=await  Arti.findAll({
                include:[Tag,Category,Comment],
                limit:size,
                order:[['create_time','DESC']],
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
}
module.exports=Article;