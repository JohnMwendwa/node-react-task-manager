const dotenv = require('dotenv');
dotenv.config({path:'config/.env'})
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomEmail = (email,name)=>{
    sgMail.send({
       to:email,
       from:'dev.johnmwendwa@gmail.com',
       subject:'Welcome to Task App',
       html:`<h2>Hey ${name}</h2>
       <p>Welcome we're glad to see you're using Task App to plan your daily tasks.Please Feel free to recommend any improvements that you might like see.</p>
       `
    })
   }
   
   module.exports = {
    sendWelcomEmail
}