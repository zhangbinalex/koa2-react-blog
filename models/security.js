const db = require('../common/db');
const Sequelize = require('sequelize');
const Admin=db.defineModel('admin',{
    id: {
        type:Sequelize.INTEGER(8),
        primaryKey: true,
        autoIncrement:true
    },
    username: Sequelize.STRING(20),
    password:Sequelize.STRING(60),
    last_login_ip: Sequelize.STRING(15),
    last_login_time: Sequelize.INTEGER(10),
    email: Sequelize.STRING(40),
    real_name: Sequelize.STRING(50),
    status: Sequelize.BOOLEAN,
    unique:Sequelize.STRING(40),
    avatar:Sequelize.STRING(80),
    zhihu:Sequelize.STRING(60),
    sina:Sequelize.STRING(60),
    github:Sequelize.STRING(60),
    logo:Sequelize.STRING(60),
    logoBlack:Sequelize.STRING(60),
    introduce:Sequelize.STRING(255)
},
    {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL 创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false
    });

module.exports=Admin;