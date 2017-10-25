const db = require('../../common/db');
const Sequelize=require('sequelize');
const dateTransform=require('../../common/dateTransform')
const Comment=db.defineModel('comments',{
    cmid:{
        type:Sequelize.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    uid:Sequelize.INTEGER(10),
    aid:Sequelize.INTEGER(10),
    pid:Sequelize.INTEGER(10),
    content:Sequelize.TEXT,
    status:Sequelize.BOOLEAN,
    avatar:Sequelize.STRING(60),
    username:Sequelize.STRING(40),
    type:Sequelize.STRING(10),
    create_time:{
        type:Sequelize.DATE,
        get(){
            let createAt = this.getDataValue('create_time');
            let date=dateTransform('yyyy-MM-dd hh:mm:ss',createAt);
            return date
        }
    }
},{
    timestamps: true,
    updatedAt: 'update_time',
    createdAt:'create_time',
    deletedAt:'delete_time'
});

module.exports=Comment;