const nodeMailer = require('../config/nodemailer');

exports.newComment = function(comment){
    let htmlTemplate = nodeMailer.renderTemplate({
        comment:comment,
    }, '/comment/new_comment.ejs' )

    // we are using sendmail() method to send the mail to the resp user
    nodeMailer.transporter.sendMail({
        from:'pandurebelsachin18@gmail.com',
        to: comment.user.email,
        subject: "New comment is published",
        html: htmlTemplate
    }, (error, info)=>{
        if(error){ console.log("error in sending mail", error); return;}

        console.log("message sent \n",info);
        return;
    });
}