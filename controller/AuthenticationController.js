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
                        profilePicture: req.body.profilePicture,
                        password: hashedPass
                    })
                    user.save()
                    .then(user => {
                        res.json({
                            message: 'User Registrtion Successful!'
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


module.exports = {
    register
}