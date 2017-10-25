const security =require('../../controllers/admin/security');
const tag =require('../../controllers/admin/tag');
const category=require('../../controllers/blog/category');
const article=require('../../controllers/admin/article');
const articleBlog=require('../../controllers/blog/article');
const comment=require('../../controllers/blog/comment');
const common=require('../../controllers/common');

const router=require('koa-router')();


    router

    /**
     * 获取一级分类信息
     */
    .get('get_top_category',category.get_top_category)

    /**
     * 获取标签信息
     */
    .get('tags_info',tag.tags_info)

    /**
     * 获取首页文章
     */
    .get('index/article',article.get)

    /**
     * 获取子分类及文章
     */
    .get('index/category',category.get_category_and_article)

    /**
     * 获取评论
     */
    .get('comment/get',comment.get)

    /**
     * 添加/回复评论
     */
    .post('comment/add',comment.add)

    /**
     * 搜索文章
     */
    .get('article/search',articleBlog.search_title)

    /**
     * 根据标签获取文章
     */
    .get('index/tag',articleBlog.get_by_tag)


module.exports=router;