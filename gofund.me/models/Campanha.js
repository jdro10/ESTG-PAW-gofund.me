var mongoose = require('mongoose');

var CampanhaSchema = new mongoose.Schema({
    descricao: String,
    valorAtingir: Number,
    iban: String,
    responsaveis: String,
    type: String,
    title: String,
    valorCurrente: Number,
    creatorId: Number,
});

module.exports = mongoose.model('Campanha', CampanhaSchema);