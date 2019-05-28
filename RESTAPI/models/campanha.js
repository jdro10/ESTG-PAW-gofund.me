var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var multer = require('multer');

//mongoose.connect(`url_here`);

var campanhaSchema = new Schema({
    nome: { type: String },
    descricao: { type: String },
    valor: { type: Number },
    iban: { type: Number },

});



module.exports = mongoose.model('Campanha', campanhaSchema);