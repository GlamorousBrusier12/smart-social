module.exports.postsPage = function (req ,res) {
    return res.render('posts', {
        title: 'Posts'
    });
}
