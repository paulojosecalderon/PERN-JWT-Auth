const router = require('express').Router();
const authorization = require('../middleware/authorization')
const {dashboardRouting} = require('../controller/dashboardController')

router.get('/', authorization, dashboardRouting)

module.exports = router;