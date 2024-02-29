const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next) => {

    User.findOne({ email: req.body.email })
    .then(existingUser => {
        if (existingUser) {
            res.json({
                message: 'Email already exists!'
            })
        } 
        else{   
            if (req.body.password !== req.body.confirmPassword) {
                res.json({
                    message: 'Passwords are not match!'
                })
            }
            else{
                bcrypt.hash(req.body.password, 10, function(err, hashedPass){
                    if(err){
                        res.json({
                            error:err
                        })
                    }

                    let user = new User ({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        mobileNumber: req.body.mobileNumber,
                        email: req.body.email,
                        password: hashedPass
                    })
                    if(req.file){
                        user.profilePicture = req.file.path
                    }
                    user.save()
                    .then(user => {
                        res.json({
                            message: 'User Registration Successful!'
                        })
                    })
                    .catch(error =>{
                        res.json({
                            message: 'User Registrtion Unsuccessful!'
                        })
                    })
                })
            }
        }
    })
}

const login =(req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.firstName}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password is incorrect!'
                    })
                }
            })
        } else{
            res.json({
                message: 'User not found!'
            })
        }
    })
}


module.exports = {
    register,
    login
}