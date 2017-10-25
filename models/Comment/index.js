const Comment=require('./Comment');
const Article=require('../Article/Article');

Comment.belongsTo(Article,{foreignKey:'aid'});

module.exports=Comment;