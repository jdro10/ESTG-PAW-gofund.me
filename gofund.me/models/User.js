var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    iban: String,
    morada: String,
    nif: Number,
    email: String,
});

module.exports = mongoose.model('User', UserSchema);