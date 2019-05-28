var mongoose = require('mongoose');

var CampanhaSchema = new mongoose.Schema({
    descricao: String,
    valorAtingir: Number,
    iban: String,
    responsaveis: String,
    type: String,
    title: String,
    valorCorrente: Number,
    creatorUsername: String,
});

module.exports = mongoose.model('Campanha', CampanhaSchema);