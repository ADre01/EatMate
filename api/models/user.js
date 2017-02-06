var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   name: String,
    email: String,
    age: Number,
    city: String,
    interests: [String],
    sex: String,
    password: String,
    url: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }

});


mongoose.model('User', userSchema);