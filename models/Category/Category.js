const db = require('../../common/db');
const Sequelize=require('sequelize');

const Catalog=db.defineModel('category',{
    cid:{
        type:Sequelize.INTEGER(4),
        primaryKey:true,
        autoIncrement:true
    },
    cname:Sequelize.STRING(45),
    keywords:Sequelize.STRING(255),
    description:Sequelize.STRING(255),
    sort:Sequelize.INTEGER(4),
    pid:Sequelize.INTEGER(4),
    pic_url:Sequelize.STRING(255),
    icon:Sequelize.STRING(255)
},{
    freezeTableName: true,
    timestamps: false
});
module.exports=Catalog;