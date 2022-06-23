const express = require('express');
const Task = require('../models/taskModel');
const router = new express.Router();

//ROUTES

// CREATE a task
router.post('/tasks',async (req,res)=>{
    try{
      const task = new Task(req.body)
      if(!task){
        throw new Error("You cannot create an empty task")
      }
      await task.save();
      res.status(201).send(task)
    }catch(e){
        res.status(400).send(e.message)
    }
})

module.exports= router;