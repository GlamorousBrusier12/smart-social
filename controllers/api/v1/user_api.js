const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const circularJSON = require('circular-json');
module.exports.createSession = async function(req, res){
    try {
        let user1 = await User.findOne({email: req.body.email});
        console.log(user1);
        if(!user1 || user1.password != req.body.password){
            console.log(req.body.email,req.body.password );

            return res.status(422).json({
                message: 'Invalid User Credentials'
            });
        }else{
            //console.log(user);
            let json1 = await circularJSON.stringify(user1);
            json1 = JSON.parse(json1);
            return res.status(200).json({
                message: 'Logged in sucessfully and here is your token',
                token : jwt.sign(json1, 'rcb', {expiresIn: 10000})
            });
        }
    } catch (error) {
        console.log('************error:'+error);
        return res.status(500).json({
            message : 'Internal Server Error' 
        });
    }
}