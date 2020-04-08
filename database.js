var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
connectionLimit: 10000,
host: 'localhost',
user: 'root',
password: 'Admin@123',
database: 'biosdata'
})
pool.query = util.promisify(pool.query) // Magic happens here.

module.exports = pool;