class  PostComments{
    // constructor
    constructor(postId){
        this.postId = postId;
        this.postContainer =$(`#post-${postId}`);
        this.commentForm = $(`#post-${postId}-comments-form`);
        
        // method for comment creation
        this.createComment(postId);
        // to call the delete links
        let commentsLinks = $('.comment-delete-button');
        for (const comment of commentsLinks) {
            this.deleteCommentDom(comment);
        } 
    }
    
    createComment(postId){
        let pself = this;
        this.commentForm.submit(function (event) {
            // console.log('hi this is the constructor of'+postId);
            event.preventDefault();
            let self = this;
            // ajax req for the creation of the comment

            $.ajax({
                type:'post',
                url:'/comment/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pself.newCommentDom(data.data.comment);
                    // console.log(pself.postId);
                    let newpost = $(`#post-${pself.postId}>#comments-section>ul`);
                    newpost.prepend(newComment);
                    new Noty({
                        type: 'success',
                        theme: 'relax',
                        text: 'Successfully added a comment',
                        layout: 'topRight',
                        timeout: 1000
                    }).show();
                    
                    // adding the delete link to the newly created comment
                    let newPostDeleteLink = $('.comment-delete-button ', newComment);
                    pself.deleteCommentDom(newPostDeleteLink);
                }, error: function (error) {
                    console.log(error.responseText);                    
                }
            })
        });
    }
    newCommentDom(comment){
        return $(`<li id="comments-${ comment._id }" >
                    <p>
                            <a href="/comment/delete/?cmtid=${ comment._id }&postid=${this.postId}" class="comment-delete-button">x</a>
                        
                        ${ comment.content }
                    </p>
                    <small>${ comment.user.name }</small>
                </li>`);
    }

    deleteCommentDom(deleteLink){
        $(deleteLink).click(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $('#comments-'+data.data.cmtid).remove();
                    new Noty({
                        type:'success',
                        theme:'relax',
                        text:'deleted the comment',
                        layout: 'topRight',
                        timeout: 1000
                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })

        })
    }
}