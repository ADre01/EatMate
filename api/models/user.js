var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   name: String,
    email: String,
    age: Number,
    city: String,
    interests: [String],
    sex: String,
    password: String,

});


mongoose.model('User', userSchema);