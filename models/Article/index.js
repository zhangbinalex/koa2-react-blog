const Article=require('./Article');
const Tag=require('../Tag/Tag');
const Category=require('../Category/Category');
const ArticleTag=require('../ArticleTag');
const Comment=require('../Comment/Comment');

Article.belongsTo(Category,{foreignKey:'cid'});
Article.hasMany(Comment,{foreignKey:'aid'});
Article.belongsToMany(Tag,{through:ArticleTag,foreignKey:'aid'});

module.exports=Article;
