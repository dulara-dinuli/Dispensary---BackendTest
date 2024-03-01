const express = require('express')
const router = express.Router()

const AuthenticationController = require('../controller/AuthenticationController')
const photoUpload = require('../service/photoUpload')
const authenticate = require('../service/authenticate')

router.post('/userRegister',photoUpload.single('profilePicture'), AuthenticationController.register)
router.post('/userLogin', AuthenticationController.login)
router.post('/showUser', authenticate, AuthenticationController.showUser)

module.exports = router