const category=require('../../models/Category');
const Icon=require('../../models/Icons');

class Category {
    static async category_info(ctx){
        let categoryListFirstLevel=await category.findAll({
            attributes: [['cid','value'],['cname','label'], 'pid','pic_url','icon'],
            where:{
                pid:1
            }
        });
        let childrens=await Promise.all(categoryListFirstLevel.map((categoryFirstLevel)=>{
            return category.findAll({
                attributes: [['cid','value'],['cname','label'], 'pid','pic_url','icon'],
                where:{
                    pid:categoryFirstLevel.dataValues.value
                }
            });
        }));
        for(let i=0;i<categoryListFirstLevel.length;i++){
            categoryListFirstLevel[i].dataValues.children = childrens[i]
        }
        ctx.body={
            data:categoryListFirstLevel,
            ret:1,
            total:categoryListFirstLevel.length
        };
    }

    static async get(ctx){
        let size=parseInt(ctx.query.size)||20;
        let page=parseInt(ctx.query.page)||1;
        let categoryList=await category.findAll({
            limit:size,
            offset:size*(page-1)
        });
        ctx.body={ret:1,data:categoryList}
    }

    static async add(ctx){
        let {cname,description,keywords,pid,icon,pic_url}=ctx.request.body;
        await category.create({
            cname,description,keywords,pid,icon,pic_url
        });
        ctx.body={ret:1,msg:'分类添加成功！'}
    }

    static async update(ctx){
        let {cname,description,keywords,pid,icon,pic_url,cid}=ctx.request.body;
        await category.update({
            cname,description,keywords,pid,icon,pic_url
        },{
            where:{cid}
        });
        ctx.body={ret:1,msg:'分类编辑成功！'}
    }

    static async delete(ctx){
        let cid=ctx.request.body.cid;
        await category.destroy({
            where:{cid}
        });
        ctx.body={ret:1,msg:'分类删除成功！'}
    }

    static async get_icons(ctx){
        const icons=await Icon.findAll();
        ctx.body={ret:1,data:icons}
    }
}
module.exports=Category;

