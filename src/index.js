// Connect to database
require('./db/mongoose')

const express = require('express');
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const cors = require('cors');

// Initialize app
const app = express();

// Environment port
const port =process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

//listen for connection
app.listen(port,()=>console.log(`Server started on port ${port}`))