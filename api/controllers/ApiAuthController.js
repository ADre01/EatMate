var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var session = require('client-sessions');



//Add user to database
module.exports.addUser = function (req, res, next) {
    //Checks if emails already exists in the database

    User.findOne({
        email: req.body.email
    }).then(function (user) {
        if (user) {
            console.log("user exists");
            return res.status(401).send({
                message: "User already exists"
            });
        } else {
            
            //Hashes password

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    var user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        city: req.body.city,
                        age: req.body.age,
                        sex: req.body.sex,
                        password: hash,
                        isLoggedIn: true
                    });
                    user.save(function (err, savedUser) {
                        if (err) {
                            if (err.message === 'This email already exists') {
                                return alert("This email already exists");
                            }
                            console.log(err);
                            res.status(401).send(err);
                        } else {
                            console.log(savedUser);
                            res.status(200).send(savedUser);
                        }

                    });
                });
            });


        }
    }).catch(function (err) {
        res.send(err);
    });
}



//Create Token
var JWT_SECRET = 'Foodie';


module.exports.loginUser = function (req, res, next) {

    //Checks for user in database
    User.find({
        email: req.body.email
    }, function (err, user) {
        bcrypt.compare(req.body.password, user[0].password, function (err, guitar) {
            if (guitar) {
                req.session.user = user;
                console.log(req.session.user);
                var token = jwt.encode(user, JWT_SECRET);
                return res.json({
                    token: token,
                    user: user
                });
            } else {
                return res.status(401).send();
            }
        });

    });
}



module.exports.logoutUser = function(req, res, next){
    User.findById(req.params.id).then(function(user){
        user.isLoggedIn = false;
        res.end();
    }).catch(function(err){
        res.send(err);
    });
}