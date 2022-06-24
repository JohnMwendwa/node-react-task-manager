const express = require('express');
const User = require('../models/userModel')
const auth = require('../middleware/authToken')
const router = new express.Router();

// ROUTES

// CREATE a new user
router.post('/users',async (req,res)=>{
    try{
     const user = new User(req.body)
     await user.save();
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
        res.send(e.message)
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
router.patch('/users/:id',async (req,res)=>{
    // determine which keys are being updated
    const updates = Object.keys(req.body)
    try{
        const user = await User.findById(req.params.id)
        if(!user){
           throw new Error("User doesn't exist")
        }
        updates.forEach(update=>(user[update] = req.body[update]))
        await user.save();
        res.send(user)
        
    }catch(e){
        res.status(400).send(e.message)
    }
})


// DELETE user
router.delete('/users/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            throw new Error('User doesn"t exist')
        }

        await user.remove()
        res.send(user)
    }catch(e){
        res.status(404).send(e.message)
    }
})
module.exports = router;