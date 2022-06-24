const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// function to generate authentication tokens
userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id:user._id},'taskapp');
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

// Custom function to log in users
userSchema.statics.findByCredentials = async (email,password)=>{
   const user = await User.findOne({email});
   if(!User){
    throw new Error("User doesn't exist!")
   }

// Check if stored password and the one provided match
   const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch){
    throw new Error("Wrong password")
   }

   return user
}


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