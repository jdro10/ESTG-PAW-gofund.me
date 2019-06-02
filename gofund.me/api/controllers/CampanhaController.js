var mongoose = require("mongoose");
var Campanha = require("../../models/Campanha");

var campanhaController = {};

campanhaController.getAllCampanhas = function (req,res,next){
    Campanha.find(function(err,campanhas){
        if(err){
            next(err);
        }else{
            res.json(campanhas);
        }
    });
};


campanhaController.getCampanhasState = function (req,res,next){
    Campanha.findOne({_id : req.params.id}, function(err,campanha){
        if(err){
            next(err);
        }else{
            res.json(campanha.estado);
        }
    });
};

module.exports = campanhaController;