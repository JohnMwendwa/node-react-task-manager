// Connect to database
require('./db/mongoose')

const express = require('express');

// Initialize app
const app = express();
// Environment port
const port =process.env.PORT || 3000

//listen for connection
app.listen(port,()=>console.log(`Server started on port ${port}`))