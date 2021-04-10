module.exports.home = function (req, res) {
    console.log(req.cookies);
    res.cookie('rol','s20');
    res.cookie('name', 'alpha navi')
    console.log('home page rendered!');
    return res.render('home',{
        title: 'Smart Socail | Home'
    });   
}