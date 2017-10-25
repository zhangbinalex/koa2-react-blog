const db =require('../../common/db');
const Sequelize = require('sequelize');

/*const ArticleTag=require('./ArticleTag')*/
var Tag=db.defineModel('tags',{
   tid:{
       type:Sequelize.INTEGER(4),
       primaryKey:true,
       autoIncrement:true
   },
    tname:Sequelize.STRING(45)
},
    {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL 创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false
    });



module.exports=Tag;
