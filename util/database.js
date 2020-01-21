const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'pioneer3423', {
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
