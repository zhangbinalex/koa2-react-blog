const security =require('../../controllers/admin/security');
const tag =require('../../controllers/admin/tag');
const category=require('../../controllers/admin/category');
const article=require('../../controllers/admin/article');
const comment=require('../../controllers/admin/comment');
const common=require('../../controllers/common');

const router=require('koa-router')();
const multer=require('koa-multer');
//配置上传文件的名称和位置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, './assets/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        const ext=file.originalname.substring(file.originalname.lastIndexOf('.')+1);
        cb(null,Date.now() + "." + ext);
    }
});

const uploadImg = multer({storage});

    /**
     * 获取登录信息
     */
    router.get('/logined_info',security.logined_info)

    /**
     * 登录
     */
    .post('/login',security.login)

    /**
     * 注销
     */
    .post('/logout',security.logout)

    /**
     *  获取标签信息
     */
    .get('/tags_info',tag.tags_info)

    /**
     *  添加标签
     */
    .post('/tag/add',tag.add)

    /**
     *  更新标签
     */
    .post('/tag/update',tag.update)

    /**
     *  删除标签
     */
    .post('/tag/delete',tag.delete)

    /**
     * 获取树形分类信息
     */
    .get('/category_info',category.category_info)

    /**
     * 获取分类信息
     */
    .get('/category/get',category.get)

    /**
     * 添加分类
     */
    .post('/category/add',category.add)

    /**
     * 更新分类
     */
    .post('/category/update',category.update)

    /**
     * 删除分类
     */
    .post('/category/delete',category.delete)

    /**
     * 获取分类icon
     */
    .get('/icons_info',category.get_icons)

    /**
     * 添加文章
     */
    .post('/article/add',article.add)

    /**
     * 文章更新
     */
    .post('/article/update',article.update)

    /**
     * 文章删除
     */
    .post('/article/delete',article.delete)

    /**
     * 获取文章信息
     */
    .get('/article/get',article.get)

    /**
     * 获取评论
     */
    .get('/comment/get',comment.get)

    /**
     * 删除评论
     */
    .post('/comment/delete',comment.delete)

    /**
     * 删除评论
     */
    .post('/img_upload',common.upload_img)

    /**
     * 获取管理员信息
     */
    .get('/setting',common.get_admin_info)

    /**
     * 设置管理员信息
     */
    .post('/setting',common.set_admin_info)






module.exports= router;