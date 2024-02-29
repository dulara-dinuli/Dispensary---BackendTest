const express = require('express')
const router = express.Router()

const AuthenticationController = require('../controller/AuthenticationController')

router.post('/userRegister', AuthenticationController.register)
router.post('/userLogin', AuthenticationController.login)

module.exports = router