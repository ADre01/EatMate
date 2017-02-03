var UserCtrl = require('../controllers/ApiUserController');
var AuthCtrl = require('../controllers/ApiAuthController');
var express = require('express');
var router = express.Router();

//Add user to database
router.post('/addUser', AuthCtrl.addUser);

//login User
router.post('/login', AuthCtrl.loginUser);


//Get criteria specific users
router.get('/match', UserCtrl.findMatchedUsers);


//Update profile info
router.put('/update/:id', UserCtrl.updateProfile);

//Get Get all Users
router.get('/:id', UserCtrl.seeAllUsers);


module.exports = router;