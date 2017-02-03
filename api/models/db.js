var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/EatMate';

mongoose.connect(dbURI);


mongoose.connection.on('connected', function(){
   console.log('Connected'); 
});


mongoose.connection.on('error', function(err){
   console.log('Error ', err); 
});

mongoose.connection.on('disconnected', function(){
   console.log('Disconnected'); 
});


require('./user');