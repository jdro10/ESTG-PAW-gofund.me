var mongoose = require('mongoose'); //importar o módulo em express

/*
Modelo de dados
Schema de campanha que gera objectos a guardar nuam coleção.
*/
var CampanhaSchema = new mongoose.Schema({
    descricao: String,
    valorAtingir: Number,
    iban: String,
    responsavel1: String,
    responsavel2: String,
    type: String,
    title: String,
    valorCorrente: Number,
    creatorUsername: String,
    estado: String,
});

module.exports = mongoose.model('Campanha', CampanhaSchema);