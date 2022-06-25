const dotenv = require('dotenv');
dotenv.config({path:'config/.env'})
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

