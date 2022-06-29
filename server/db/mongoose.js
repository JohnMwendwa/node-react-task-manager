const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'config/.env'})
// mongodb url
const url = process.env.MONGODB_URL;

mongoose.connect(url)
 .then(
    (res)=>{console.log('connected to the database')},
    err=>{console.log('could not connect to the database')}
 )