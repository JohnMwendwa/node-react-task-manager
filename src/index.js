// Connect to database
require('./db/mongoose')

const express = require('express');
const userRouter = require('./routers/userRouter')

// Initialize app
const app = express();

// Environment port
const port =process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

//listen for connection
app.listen(port,()=>console.log(`Server started on port ${port}`))