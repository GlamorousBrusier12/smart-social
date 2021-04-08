module.exports.userProfile = function (req, res) {
    return res.end('<h1>This is the profile page</h1>');
}
module.exports.userHome = function (req, res) {
    return res.render('user', {
        title: 'User'
    });
}
// conncecting to the sign in and sign up page
module.exports.UserSignIn = function (req, res) {
    return res.render('signin',{
        title: 'Smart Social | Sign In'
    });
}
module.exports.UserSignUp = function (req, res) {
    return res.render('signup',{
        title: 'Smart Social | Sign Up'
    });
}