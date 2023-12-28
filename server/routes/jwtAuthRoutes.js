const express = require('express')
const router = express.Router();
const {registerRoute, loginRoute} = require('../controller/jwtAuthController')

router.post('/register', registerRoute);
router.post('/login', loginRoute);

module.exports = router;
