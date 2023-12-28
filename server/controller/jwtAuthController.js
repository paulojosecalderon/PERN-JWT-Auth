const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const authorization = require('../middleware/authorization')
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
            res.status(401).json('User already exists')
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *', [name, email, bcryptPassword]);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id)
        res.json({jwtToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error')
    }
};

/**Login Proces
1. Destructure the email, password from the req.body
2. Check if user already exists by comparing the entered email
3. Check if inputted password is correct 
4. Give token to user
*/

const loginRoute = async(req,res)=>{
    try {
        const {email, password} = req.body
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1;', [email]);

        if(user.rows.length===0){
            res.status(401).json('Invalid credentials')
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            res.status(401).json('Invalid credentials')
        }

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        res.json({jwtToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }

};

//Function of the Verification route that returns a true value if token in the req.header is valid
const verifyRoute = async(req,res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error')
    }
};

module.exports = {
    registerRoute,
    loginRoute,
    verifyRoute
};