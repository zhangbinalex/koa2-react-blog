const tag=require('../../models/Tag');

class Tag {
    static  async tags_info(ctx){
        let size=parseInt(ctx.query.size)||20;
        let page=parseInt(ctx.query.page)||1;
        const tagList=await tag.findAll({
            limit:size,
            offset:(page-1)*size
        });
        ctx.body={data:tagList,ret:1,total:tagList.length};
    }

    static  async add(ctx){
        const tname=ctx.request.body.tname;
        await tag.create({
            tname
        });
        ctx.body={
            ret:1,msg:'标签添加成功'
        }
    }

    static  async update(ctx){
        const {tid,tname}=ctx.request.body;
        await tag.update({tname},{
            where:{tid}
        })
        ctx.body={
            ret:1,msg:'标签编辑成功'
        }
    }
    static async delete(ctx){
        const tid=ctx.request.body.tid;
        await tag.destroy({
            where:{tid}
        });
        ctx.body={
            ret:1,msg:'标签删除成功'
        }
    }
}

module.exports=Tag;