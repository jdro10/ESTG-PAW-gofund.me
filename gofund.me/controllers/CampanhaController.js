/*
Campanha Controller 
Liga o schema campanha da pasta models às views
*/

var mongoose = require('mongoose');
var Campanha = require('../models/Campanha');

var campanhaController = {};

//listar campanhas 

campanhaController.list = function(req, res){
    Campanha.find({}).exec(function(err, campanhas){
        if(err){
            console.log('Error: ', err);
        }else{
            res.render("../views/campaign/campaignsDatabase", {campanhas: campanhas}); //apresentação dos dados
        }
    });
};

//mostra detalhes de uma campanha

campanhaController.show = function(req, res){
    Campanha.findOne({_id: req.params.id}).exec(function(err, campanha){
        if(err){
            console.log('Error:', err);
        }
        else{
            res.render("../views/campaign/campaignDetail", {campanha: campanha});
        }
    });
};

campanhaController.save = function(req, res){
    var campanha = new Campanha(req.body);
    campanha.save(function(err){
        if(err){
            console.log('Err:', err);
        }
        else{
            console.log('Campanha criada com sucesso!');
            res.redirect("/campaign/show/" + campanha._id); //redirect para a campanha criada
        }
    });
};

//elimina campanha

campanhaController.delete = function(req, res){
    Campanha.remove({_id: req.params.id}, function(err){
        if(err){
            console.log('Error:', err);
        }
        else{
            console.log('Campanha apagada!');
            res.redirect('../');
        }
    });
};

//pesquisar campanha pelo IBAN



module.exports = campanhaController;