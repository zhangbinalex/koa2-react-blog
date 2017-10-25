const Article=require('../Article/Article');
const Tag=require('./Tag');
const ArticleTag=require('../ArticleTag');
Tag.belongsToMany(Article,{through:ArticleTag,foreignKey:'tid'});
module.exports=Tag;
