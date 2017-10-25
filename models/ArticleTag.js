const db=require('../common/db');
const Sequelize=require('sequelize');
const Article=require('./Article/Article');
const Tag=require('./Tag/Tag');
const ArticleTag=db.defineModel('article_tags',{
    aid:{
        type:Sequelize.INTEGER(8),
        primaryKey:true
    },
    tid:{
        type:Sequelize.INTEGER(4),
        primaryKey:true
    }
},{
    freezeTableName: true,
    timestamps: false
});
module.exports=ArticleTag;