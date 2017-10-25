const db=require('../../common/db');
const Sequelize=require('sequelize');
const dateTransform=require('../../common/dateTransform')
/*const ArticleTag=require('./ArticleTag');*/


const Article=db.defineModel('articles',{
    aid:{
        type:Sequelize.INTEGER(8),
        primaryKey:true,
        autoIncrement:true
    },
    title:Sequelize.STRING(100),
    author:Sequelize.STRING(20),
    content:Sequelize.TEXT,
    keywords:Sequelize.STRING(255),
    description:Sequelize.STRING(255),
    is_show:Sequelize.BOOLEAN,
    is_top:Sequelize.BOOLEAN,
    is_delete:Sequelize.BOOLEAN,
    is_original:Sequelize.BOOLEAN,
    click:Sequelize.INTEGER(10),
    create_time:{
        type:Sequelize.DATE,
        get(){
            let createAt = this.getDataValue('create_time');
            let date=dateTransform('yyyy-MM-dd hh:mm:ss',createAt);
            return date
        }
    },
    update_time:Sequelize.DATE,
    pic_path:Sequelize.STRING(255),
    cid:Sequelize.INTEGER(4),
    delete_time:Sequelize.DATE,
},{
    timestamps: true,
    updatedAt: 'update_time',
    createdAt:'create_time',
    deletedAt:'delete_time'
});

module.exports=Article;
