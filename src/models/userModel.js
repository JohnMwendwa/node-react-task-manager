const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
    }
})

userSchema.pre('save', async function (next){
    const user = this;
    // Hash password only when creating or updating it
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    // call the next middleware after hashing is complete
    next()
})

const User = mongoose.model('User',userSchema);

module.exports= User;