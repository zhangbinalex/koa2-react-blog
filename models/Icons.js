const db=require('../common/db');
const Sequelize=require('sequelize');
const Icons=db.defineModel('icons',{
    id:{
        type:Sequelize.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    icon_class:Sequelize.STRING(20)
}, {
        freezeTableName: true,
        timestamps: false
    });

module.exports=Icons;