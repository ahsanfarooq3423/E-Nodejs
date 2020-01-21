const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'pioneer3423',
    database : 'node-complete'
})

module.exports = pool.promise();