const express = require('express');
const { findById } = require('../models/userModel');
const router = new express.Router();
const User = require('../models/userModel')

// ROUTES

// CREATE a new user
router.post('/users',async (req,res)=>{
    try{
     const user = new User(req.body)
     await user.save();
     res.status(201).send(user)
    }catch(e){
        res.status(400).send(e.message)
    }
})

// GET all users
router.get('/users',async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e.message)
    }
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

module.exports = router;