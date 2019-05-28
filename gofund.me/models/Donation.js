var mongoose = require('mongoose'); //importar o módulo em express

/*
Modelo de dados
Schema de Donations que gera objectos a guardar nuam coleção.
*/

var DonationSchema = new mongoose.Schema({
    username: String,
    campanha: String,
    montante: Number,
    nif: Number,
});

module.exports = mongoose.model('User', UserSchema);