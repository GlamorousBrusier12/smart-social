const nodemailer =require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const { realpath } = require('fs');

// we are define the transporter method which is used to send the mails 
// to the user
let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    // usually port 25 is used for the smtp as this is lls protol we use 587
    port: 587,
    secure:false,
    auth:{
        user: "viratn14",
        pass: "kumarnaveen10"
    }
});

// we define the place where the mail templates are given just like the views
let renderTemplate = (data, relativepath) =>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativepath),
        data,
        function(err, template){
            if(err){console.log('error in sending the template', err); return}

            mailHtml = template;
        }
    );

    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};

