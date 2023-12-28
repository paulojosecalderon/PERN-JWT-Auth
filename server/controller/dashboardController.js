const pool = require('../db');

const dashboardRouting = async(req,res)=>{
    try {
        //Now the req.user has the payload
        //res.json(req.user); 

        const user = await pool.query('SELECT user_name FROM users WHERE user_id = $1', [req.user]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server Error');
    }  
};

module.exports = {
    dashboardRouting
};