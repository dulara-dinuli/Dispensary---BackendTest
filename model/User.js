const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDataSchema = new Schema({
    firstName:  {type: String},
    lastName:  {type: String},
    mobileNumber:  {type: String},
    email:  {type: String},
    profilePicture:  {type: String},
    password:  {type: String}
},
{timestamps: true})

const User = mongoose.model('User', userDataSchema)
module.exports = User
