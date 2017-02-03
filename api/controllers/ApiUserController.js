var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');



//Lists all Users
module.exports.seeAllUsers = function (req, res, next) {
    User.find({}).then(function (users) {
        res.status(200).send(users);
    }).catch(function (err) {
        res.status(401).send(err);
    });
};


//Finds match according to preference
module.exports.findMatchedUsers = function (req, res, next) {
    User.findOne({_id: '58944cb4be718600d472e888'}).then(function(doc){
        console.log(doc);
       res.send(doc); 
    }).catch(function(err){
        res.send(err);
    });
};



//Updates user profile
module.exports.updateProfile = function (req, res, next) {
    User.findById(req.params.id).then(function (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.age = req.body.age;
        user.city = req.body.city,
            user.interests = req.body.interests;
        user.sex = req.body.sex;
        user.password = req.body.password;
        user.save(function (err, updatedUser) {
            if (err) {
                res.status(401).send(err);
            } else {
                res.status(200).send(updatedUser);
            }
        });

    }).catch(function (err) {
        res.status(401);
        console.log(err);
    });
};