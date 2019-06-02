var mongoose = require('mongoose'); //importar o módulo em express

/*
Modelo de dados
Schema de Donations que gera objectos a guardar nuam coleção.
*/

var DonationSchema = new mongoose.Schema({
    username: String,
    campanha: String,
    montante: Number,
    userId: String,
    estado: { type: String, enum: ['canceled', 'processing','processed'] }
});

module.exports = mongoose.model('Donation', DonationSchema);