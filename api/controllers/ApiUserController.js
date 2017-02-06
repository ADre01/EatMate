var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
var Grid = require('gridfs-stream');
var fs = require('fs-extra');
var path = require('path');
var cloudinary = require('cloudinary');


process.env['CLOUDINARY_URL']='cloudinary://953571661752691:wG-JsLwOlBbHm269XmNHnqlEvYM@ddqpgjqkh';





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
    var Userpref = req.body;
    for (var p in Userpref) {
        if (p == null) {
            delete Userpref.p;
            //return Userpref;
        }
    }
    User.find(Userpref).then(function (doc) {
        if (doc) {
            return res.send(doc);
        } else if (!doc) {
            return res.status(404).send({
                message: 'No users found'
            });
        }
    }).catch(function (err) {
        return res.send(err);
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

 cloudinary.config({
    cloud_name: 'ddqpgjqkh',
    api_key: '953571661752691',
    api_secret: 'wG-JsLwOlBbHm269XmNHnqlEvYM'
    });



module.exports.uploadImage = function(req, res, next) {
    if (req.files.file) {
        cloudinary.uploader.upload(req.files.file.path, function (result) {
            if (result.url) {
                req.imageLink = result.url;
                res.json(result);
                next();
            } else {
                res.json(error);
            }
        });
    } else {
        next();
    }
}