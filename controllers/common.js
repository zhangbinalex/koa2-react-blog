const fs = require('fs');
const util = require('util');
const Admin=require('../models/security');
class Common{
    static async upload_img(ctx){
        let imgData=ctx.request.body.img;
        let type = imgData.match(/^data:image\/(.+);/)[1];
        let base64Data=imgData.replace(/^data:image\/\w+;base64,/,"");
        let imgBuffer=new Buffer(base64Data,'base64');
        const writeFile=util.promisify(fs.writeFile);
        const imgName=new Date().getTime();
        const path=`web/assets/uploads/img/${imgName}.${type}`;
        await writeFile(path, imgBuffer);
        ctx.body={ret:1,msg:'上传成功',img:`assets/uploads/img/${imgName}.${type}`};
    }
    static async get_admin_info(ctx){
        let username=ctx.session.user?ctx.session.user.username:'394971897';
        console.log(username)
        let info=await Admin.findOne({
            attributes:['avatar','zhihu','github','logo','logoBlack','introduce','email','sina'],
            where:{
                username
            }
        });
        ctx.body={ret:1,data:info}
    }

    static async set_admin_info(ctx){
        let username=ctx.session.user?ctx.session.user.username:'394971897';
        let {avatar,zhihu,github,logo,logoBlack,introduce,email,sina}=ctx.request.body;
        console.log(avatar)
        await Admin.update({
            avatar:avatar,zhihu,github,logo,logoBlack,introduce,email,sina
        },{
            where:{
                username
            }
        });
        ctx.body={ret:1,msg:'信息修改成功！'}
    }
}
module.exports=Common;