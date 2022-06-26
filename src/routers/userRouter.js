const express = require('express');
const User = require('../models/userModel')
const auth = require('../middleware/authToken');
const {sendWelcomeEmail,sendCancellationEmail} = require('../emails/email');
const router = new express.Router();
const multer = require('multer');

// Setup how Images will be uploaded
const upload = multer({
    // limit image files to 1MB size
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image of type jpg,jpeg or png'))
        }
        cb(null,true)
    }
})



// ROUTES

// CREATE a new user
router.post('/users',async (req,res)=>{
    try{
     const user = new User(req.body)
     await user.save();
     sendWelcomeEmail(user.email,user.name)
     await user.generateAuthToken();
     
     res.status(201).send(user)
    }catch(e){
        res.status(400).send(e.message)
    }
})

// LOGIN a user
router.post('/users/login',async (req,res)=>{
    const email = req.body.email.toLowerCase();
    const password =req.body.password;
    try{
        const user = await User.findByCredentials(email,password);
        const token = await user.generateAuthToken();
        res.send({user,token}) 
    }catch(e){
        res.status(401).send(e.message)
    }
})

// LOGOUT a user
router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(token=> token.token !== req.token);
        await req.user.save()
        res.send('Logged out')
    }catch(e){
        res.status(500).send()
    }
})

// LOGOUT a user for all active sessions
router.post('/users/logoutAll',auth,async (req,res)=>{
   try{
    req.user.tokens = []
    await req.user.save()
    res.send('Successfully logged out of all active sessions')
   }catch(e){
    res.status(500).send()
   }
})

// GET a single user after authentication
router.get('/users/me',auth,async (req,res)=>{
   res.send(req.user)
})


// UPDATE a user
router.patch('/users/me',auth,async (req,res)=>{
    // determine which keys are being updated
    const updates = Object.keys(req.body)
    try{
      updates.forEach(update=>(req.user[update] = req.body[update]))
      await req.user.save();

      res.send(req.user)      
    }catch(e){
        res.status(400).send(e.message)
    }
})


// DELETE user
router.delete('/users/me',auth, async (req,res)=>{
    try{
        await req.user.remove()
        sendCancellationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(404).send(e.message)
    }
})

// UPLOAD a profile pic
router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
    req.user.avatar = req.file.buffer;
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send(error.message)
})

// REMOVE profile pic
router.delete('/users/me/avatar',auth, async (req,res)=>{
    try{
      req.user.avatar = undefined;
      await req.user.save();
      res.send()
    }catch(e){
        res.status(500).send(e.message)
    }
})

// SERVER UP Image files
router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})


module.exports = router;