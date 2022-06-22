const express = require('express');
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

module.exports = router;