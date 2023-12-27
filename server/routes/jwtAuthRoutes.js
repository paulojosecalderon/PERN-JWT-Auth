const express = require('express')
const router = express.Router();
const {registerRoute} = require('../controller/jwtAuthController')

router.post('/register', registerRoute);

module.exports = router;
