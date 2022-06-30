// Connect to database
require('./db/mongoose')

const path = require('path');
const express = require('express');
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

// Initialize app
const app = express();

// Environment port
const port =process.env.PORT 

// set path to react build folder
const reactAssets = path.join(__dirname,'../client/build');
const indexPage = path.join(__dirname,'../client/build','index.html');

//set express server to serve react static assets
app.use(express.static(reactAssets));

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get('/*',(req,res)=>{
    res.sendFile(indexPage)
})

//listen for connection
app.listen(port,()=>console.log(`Server started on port ${port}`))