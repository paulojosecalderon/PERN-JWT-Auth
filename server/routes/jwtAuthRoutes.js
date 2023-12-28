const router = require('express').Router();
const {registerRoute, loginRoute, verifyRoute} = require('../controller/jwtAuthController')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

//Routers
router.post('/register', validInfo, registerRoute);
router.post('/login', validInfo, loginRoute);
router.get('/verify', authorization, verifyRoute);


module.exports = router;
