const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'taskapp');
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }
        req.user = user;
        next()
    }catch(e){
        res.status(401).send('Please authenticate!')
      }
}

