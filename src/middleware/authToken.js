const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const secret = process.env.CONSUMER_SECRET;

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,secret);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token;
        req.user = user;
        next()
    }catch(e){
        res.status(401).send('Please authenticate!')
      }
}

module.exports= auth;
