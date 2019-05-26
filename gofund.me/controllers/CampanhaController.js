var mongoose = require('mongoose');
var Campanha = require('../models/Campanha');

var campanhaController = {};

campanhaController.list = function(req, res){
    Campanha.find({}).exec(function(err, campanhas){
        if(err){
            console.log('Error: ', err);
        }else{
            res.render("../views/campaign/campaignsDatabase", {campanhas: campanhas});
        }
    });
};

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

campanhaController.create = function(req, res){
    res.render("../views/campaignPage");
};

campanhaController.save = function(req, res){
    var campanha = new Campanha(req.body);
    campanha.save(function(err){
        if(err){
            console.log('Err:', err);
        }
        else{
            console.log('Campanha criada com sucesso!');
            res.redirect("/campaign/show/" + campanha._id);
        }
    });
};

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

module.exports = campanhaController;