const koa=require('koa');
const koaRouter=require('koa-router');
const bodyParser=require('koa-bodyparser');
const koaStatic=require('koa-static');
const multer = require('koa-multer');
const router=koaRouter();
const blog=require('./routes/blog');
const admin=require('./routes/admin');
const session=require('koa-session2');
const cors =require('koa2-cors');
const logger=require('koa-logger');



var app=new koa();

//错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {ret:0,msg:err.message};
        ctx.app.emit('error', err, ctx);
    }
});
app.use(logger());

//session存储
app.use(session({
    key:'sessionBlog',
    maxAge:30*24*60*60
}));

//跨域设置
app.use(cors());

/*//文件上传
app.use(upload.any());*/

//静态文件路径
app.use(koaStatic('./web'));

//body解析
app.use(bodyParser({formLimit:'10mb'}));

router.use('/', blog.routes());
router.use('/admin', admin.routes());

//路由分配
app.use(router.routes(),router.allowedMethods());


//监听服务
app.listen(80);