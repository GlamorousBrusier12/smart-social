module.exports.userProfile = function (req,res) {
    return res.end('<h1>This is the profile page</h1>');
}
module.exports.userHome = function (req,res) {
    return res.end('<h1>This is the User Home page</h1>');
}