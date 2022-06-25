const express = require('express');
const auth = require('../middleware/authToken');
const Task = require('../models/taskModel');
const router = new express.Router();

//ROUTES

// CREATE a task
router.post('/tasks',auth,async (req,res)=>{
    try{
      const task = new Task({
        ...req.body,
        author:req.user._id
      })
      if(!task){
        throw new Error("You cannot create an empty task")
      }
      await task.save();
      res.status(201).send(task)
    }catch(e){
        res.status(400).send(e.message)
    }
})

// GET all tasks
router.get('/tasks', auth, async (req,res)=>{
    try{
        const tasks = await Task.find({author:req.user._id});
        if(tasks.length === 0){
         return res.send('You have not created any tasks yet')
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e.message)
    }
})

// GET a single task
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id,author:req.user._id});

        if(!task){
            return res.status(404).send("Task doesn't exist")
        }
        res.send(task)
    }catch(e){
        res.status(404).send("Task doesn't exist")
    }
})

// UPDATE a task
router.patch('/tasks/:id', auth, async (req,res)=>{
    const updates = Object.keys(req.body);
    try{
      const task = await Task.findOne({_id:req.params.id,author:req.user._id});

      if(!task){
        return res.status(404).send("Task doesn't exist!")
      }
      updates.forEach(update=>task[update] = req.body[update])
      await task.save()
      res.send(task)
    }catch(e){
        res.status(404).send()
    }
})

// DELETE a single task
router.delete('/tasks/:id', auth, async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,author:req.user._id});

        if(!task){
            return res.status(404).send("Task doesn't exist!")
        }

        res.send('Task Deleted successfully')
    }catch(e){
        res.status(404).send("Task doesn't exist!")
    }
})

// DELETE all tasks
router.delete('/tasks', auth, async (req,res)=>{
    try{
      const tasks = await Task.find({author:req.user._id});
       if(tasks.length === 0){
        return res.status(404).send("You currently do not have any tasks")
       }
        await Task.deleteMany();
        res.send('All tasks have been removed')
    }catch(e){
        res.status(500).send(e.message)
    }
})

module.exports= router;