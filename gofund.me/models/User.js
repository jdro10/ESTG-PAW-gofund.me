var mongoose = require('mongoose'); //importar o módulo em express

/*
Modelo de dados
Schema de Users que gera objectos a guardar nuam coleção.
*/

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    iban: String,
    morada: String,
    nif: Number,
    email: String,
    fullName: String,
});

module.exports = mongoose.model('User', UserSchema);