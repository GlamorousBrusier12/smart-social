const User = require('../models/user');
const Comment = require('../models/comment');
const Posts = require('../models/post');
const { response } = require('express');
const commentsMailer = require('../mailer/comments_mailer');
const commentsEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.saveComment = async function (req, res) {

    try {
        
        let post = await Posts.findById(req.body.post)
        
        if(post){
            let comment = await Comment.create({
                content: req.body.commentContent,
                user: req.user.id,
                post: req.body.post
            });
            post.comments.push(comment);
            post.save();
            // req.flash('success', 'Comment posted!');
            // populating the user with the usename for the comments
            

            comment = await comment.populate('user', 'name email').execPopulate();
            // after the comment was created succefully we send the mail to the resp user 
            // using
            // commentsMailer.newComment(comment);
            
            let job = queue.create('email', comment).save(function(err){
                if(err) {console.log('error in sending the email to the queue', err); return;}

                console.log("job is Getting Queued !", job.id,'\n');
            })
            
            if(req.xhr){
            
            
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: 'comment created'
                });
            }
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        console.log('Error:', error);    
    }
    
}

// delete comment
module.exports.deleteComment = async function (req, res) {

    try {
        let postu = await Posts.findById(req.query.postid);
        let comment = await Comment.findById(req.query.cmtid);
        if(req.user.id == comment.user || req.user.id == postu.user ){
            comment.remove();
            let post = await Posts.findById(req.query.postid);
            post.comments.remove( req.query.cmtid);
            // req.flash('success', 'Comment deleted!');
            post.save();
            if(req.xhr){
                console.log('xhr');
                return res.status(200).json({
                    data: {
                        cmtid : req.query.cmtid
                    }
                });
            }
        }else{
            console.log(`not deleted the comment`);
        }
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        console.log('Error:', error);    
    }

}