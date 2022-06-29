const dotenv = require('dotenv');
dotenv.config({path:'config/.env'})
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
       to:email,
       from:'dev.johnmwendwa@gmail.com',
       subject:'Welcome to Task App',
       html:`<h2>Hey ${name}</h2>
       <p>Welcome, we're glad to see you're using Task App to plan your daily tasks.Please Feel free to recommend any improvements that you might like see.</p>
       `
    })
   }
   
   const sendCancellationEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'dev.johnmwendwa@gmail.com',
        subject:'We regret to see you leave',
        html:`<h2>Hey ${name}</h2>
        <p>We regret to see you leave. We hope to see you back soon.</p>
        <p>Kindly suggest any feature improvement that you'd like to see in the app</p>
        `
    })
   }

   module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}