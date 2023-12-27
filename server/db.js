const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    database: 'jwtusers',
    port: 5432,
    user: 'postgres',
    password: process.env.DB_Password
})

module.exports = pool;