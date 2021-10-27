const queue = require('../config/kue');
const commentsMailer = require('../mailer/comments_mailer');

// there will be a process function in each of the worker which runs when ever a new thing is added 
// into the queue
queue.process('email', function(job, done){

    // console.log('worker is processing the job', job.data);

    // instead of calling the comments mailer in the commetns controller we are calling it in the queue
    commentsMailer.newComment(job.data);

    done();

});