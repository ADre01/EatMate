var UserCtrl = require('../controllers/ApiUserController');
var AuthCtrl = require('../controllers/ApiAuthController');
var auth = require('../auth/auth');
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//Add user to database
router.post('/addUser', AuthCtrl.addUser);

//login User
router.post('/login', AuthCtrl.loginUser);


//Get criteria specific users
router.post('/match', UserCtrl.findMatchedUsers);


//Post image
router.post('/uploadImage', multipartMiddleware,UserCtrl.uploadImage);


//Update profile info
router.put('/update/:id', UserCtrl.updateProfile);

//Get Get all Users
router.get('/:id', UserCtrl.seeAllUsers);


module.exports = router;