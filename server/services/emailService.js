require('dotenv').config();
// const SENDGRID_API_KEY = "";
const sgMail = require('@sendgrid/mail');
// const {EMAIL_MSG_SUBJECT, EMAIL_MSG_HTML} = require('../constants/constants')

exports.sendEmail = async (to, from, to_name, plan, startDate, endDate, isExpired = false) =>{
    // sgMail.setApiKey(SENDGRID_API_KEY)

    let message = isExpired ? 
        `Dear ${to_name},
        We are thrilled to inform you that your TradingView subscription has been successfully processed! 🎉

        Thank you for choosing TradingView as your trusted partner in trading and investment insights. We believe that our platform will empower you with the tools and resources necessary to take your trading strategy to the next level.

        Subscription Details:
        Plan: ${plan}
        Subscription Start Date: [${new Date(startDate)}]
        Subscription End Date: [${new Date(endDate)}]

        What’s Next:
        You can start enjoying your premium features immediately. Log in to your TradingView account to explore the advanced charts, real-time data, and personalized tools.
        Don't forget to check out the [quick start guide](insert link) designed to help you get the most out of your new subscription.
        Should you have any questions or need assistance, our dedicated support team is here to help. Feel free to respond to this email or contact us at Support Email/Phone Number.

        Thank you once again for subscribing to TradingView! We are excited to accompany you on your trading journey.
        Happy Trading!
        Warm regards` :
        `Dear ${to_name},

        We hope you are enjoying your experience with us! This is a friendly reminder that your subscription is set to expire in 1 day on [Expiration Date].

        Subscription Details:
        Plan: ${plan}
        Subscription Start Date: [${new Date(startDate)}]
        Subscription End Date: [${new Date(endDate)}]
        To ensure continued access to our services, we recommend renewing your subscription. You can easily renew by logging into your account.`

    // console.log(EMAIL_MSG_SUBJECT, '[][]')
    const msg = {
        to: to, 
        from: from, 
        subject: "TradingView Subscription Email Service",
        text: message,
        html: "<strong>Welcome</strong>",
    }
    try {
        // Await the response from sgMail.send
        const response = await sgMail.send(msg);
        
        // Process the response outside the send function
        // console.log('Email sent successfully!');
        // console.log('Status Code:', response[0].statusCode); // Status code
        // console.log('Headers:', response[0].headers); // Response headers
        
        // Log other attributes if required
        const requestId = response[0].headers['x-message-id'];
        // console.log('Message ID:', requestId); // Log the message ID returned by SendGrid
        return response[0].statusCode
    } catch (error) {
        // Handle any errors
        console.error('Error sending email:');
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Body:', error.response.body);
            return error.response.status==undefined ? 511 : error.response.status;
        } else {
            console.error('Error Message:', error.message);
            return 401;
        }
    }

}