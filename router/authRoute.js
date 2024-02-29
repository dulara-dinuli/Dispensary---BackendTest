const express = require('express')
const router = express.Router()

const AuthenticationController = require('../controller/AuthenticationController')
const photoUpload = require('../service/photoUpload')

router.post('/userRegister',photoUpload.single('profilePicture'), AuthenticationController.register)
router.post('/userLogin', AuthenticationController.login)

module.exports = router