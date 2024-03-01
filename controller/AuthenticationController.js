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
                    let token = jwt.sign({name: user.firstName}, 'AzQ,PI)0(', {expiresIn: '1h'})
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

const showUser = (req, res, next) => {
    var username = req.body.username
    User.findOne({$or: [{email:username}]})
    .then(user => {
        const userDetails = [
            `First Name: ${user.firstName}`,
            `Last Name: ${user.lastName}`,
            `Mobile Number: ${user.mobileNumber}`,
            `Email: ${user.email}`,
            `Profile Picture Path: ${user.profilePicture}`
        ];
        
        const message = `Authorized User!\n${userDetails.join('\n')}`;
        
        res.set('Content-Type', 'text/plain');
        res.send(message);
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
} 


module.exports = {
    register,
    login,
    showUser
}