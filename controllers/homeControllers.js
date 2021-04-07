module.exports.home = function (req, res) {
    console.log('home page rendered!');
    return res.render('home',{
        title: 'home'
    });   
}