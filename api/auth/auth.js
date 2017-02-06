var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jwt-simple');

module.exports.auth = function(req, res, next){
    console.log(req.query);
    //res.json(decoded);
}