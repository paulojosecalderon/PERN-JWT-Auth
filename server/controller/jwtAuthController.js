const express = require('express');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

/**Registration Proces
1. Destructure the name, email, password from the req.body
2. Check if user already exists
3. Bcrypt password 
4. Give token User

*/
const registerRoute = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1;', [email]);
        
        if(user.rows.length!==0){
            res.json('User already exists')
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *', [name, email, bcryptPassword]);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id)
        res.json({jwtToken});
    } catch (error) {
        console.error(error.message);
        res.status(401).json('Server Error')
    }
};

module.exports = {
    registerRoute
}