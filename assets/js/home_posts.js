{
    let postCreate = function () {
        let postCreateForm = $('#post-create-form');
        postCreateForm.submit(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postCreateForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-display>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function (error) {
                    console.log(error.responseText);
                }

            })
        });
    }
    
    // method to create a post in dom
    let newPostDom = function (post) {
        console.log(post);
        return $(`<li id="post-${post._id}" >
                        <p>
                            
                            <a href="/posts/delete/${post._id}" class="delete-post-button">x</a>
                             
                            
                            ${ post.content}
                    
                            <br>
                            <small>${ post.user.name }</small>
                            <div id="comments-section">
                                
                                    <form action="/comment/create" method="post">
                                        <textarea name="commentContent" id="comment-content" cols="15" rows="3" placeholder="comment here..." required></textarea>
                                        <input type="hidden" name="post" value="${ post._id }" >
                                        <button type="submit" id="add-comment">Add comment</button>
                                    </form>
                                
                                <h4>comments</h4>
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                            </div>
                        </p>
                    </li>`)
    }
    
    // method to delete post in dom
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }
    postCreate();


}

