const express = require('express');
const router = new express.Router();
const User = require('../models/userModel')

// ROUTES


// GET all users
router.get('/users',async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
})
