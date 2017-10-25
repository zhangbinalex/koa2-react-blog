const config=require('../config');
const Sequelize=require('sequelize');

var sequelize=new Sequelize(config.database, config.username, config.password,{
    host:config.host,
    dialect:'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    }
});
const ID_TYPE = Sequelize.STRING(50);
module.exports={
    defineModel(name, attributes,opt) {
        /*var attrs = {};
        for (let key in attributes) {
            let value = attributes[key];
            if (typeof value === 'object' && value['type']) {
                value.allowNull = value.allowNull || false;
                attrs[key] = value;
            } else {
                attrs[key] = {
                    type: value,
                    allowNull: false
                };
            }
        }*/
        /* attrs.id = {
             type: ID_TYPE,
             primaryKey: true
         };
         attrs.createdAt = {
             type: Sequelize.BIGINT,
             allowNull: false
         };
         attrs.updatedAt = {
             type: Sequelize.BIGINT,
             allowNull: false
         };
         attrs.version = {
             type: Sequelize.BIGINT,
             allowNull: false
         };*/
        return sequelize.define(name, attributes,opt/*, {
            tableName: name,
            timestamps: false,
            hooks: {
                beforeValidate: function (obj) {
                    let now = Date.now();
                    if (obj.isNewRecord) {
                        if (!obj.id) {
                            obj.id = generateId();
                        }
                        obj.createdAt = now;
                        obj.updatedAt = now;
                        obj.version = 0;
                    } else {
                        obj.updatedAt = Date.now();
                        obj.version++;
                    }
                }
            }
        }*/);
    }
}
