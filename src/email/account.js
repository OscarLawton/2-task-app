const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = "";

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'emmetlawton@gmail.com',
        subject: 'Welcome!',
        text: `Welsom to the Task App ${name}. Let me knwo how get along with the app.`
    });
    
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'emmetlawton@gmail.com',
        subject: 'We regret to see you go',
        text: `Sorry to hear you want to leave, ${name}. Let me know if there is anything we could do to change your mind.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}