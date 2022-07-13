const dotenv = require('dotenv');
dotenv.config({path:'config/.env'})
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
       to:email,
       from:'dev.johnmwendwa@gmail.com',
       subject:'Welcome to Task App',
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Email</title>
           <style>
                body{
                    height: 100vh;
                    margin: 0 auto;
                    padding: 0;
                    background: #ee8625;
                }
                header{
                height: 100px;
                background-color: #ee8625;
                }
                .main{
                    background-color: #fff;
                    width:50%;
                    margin: -50px auto 50px;
                    padding: 0 20px;
                    min-height: 50%;
                    border-radius: 10px;
                    max-width: 400px;
                    min-width: 300px;       
                }
      
               .main p{
                   font-size: 1.2rem;
               }
               .main h1{
                   text-align: center;
               }
               .footer{
                   margin-top: 100px;
                   background-color: #ff5e14;
                   color: #fff;
                   padding: 30px 20px;
               }
               .footer a{
                   color: white;
                   text-decoration: none;
                   margin-left:120px;
               }
           </style>
       </head>
       <body>
           <header>
              
           </header>
            <div class="main">
               <h1>Welcome!</h1>
               <h3>Hey ${name}</h3>
               <p>I'm glad to see you're using Task App to plan your everyday tasks. Please feel free to recommend any feature improvements that you may like to see in the app.</p>
               <p>For any feedback, just reply to this email - I'll reply to you as soon as possible.</p>
            </div>
           <div class="footer">
               <span> &copy; 2022</span>
           <a href="mailto:dev.johnmwendwa@gmail.com">John Mwendwa</a>
           </div>
           <script>
             const date = document.querySelector('.date')
             date.textContent += new Date().getFullYear();
           </script> 
       </body>
       </html>
       
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