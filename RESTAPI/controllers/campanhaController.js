var mongoose = require("mongoose");
var Campanha = require("../models/campanha");

var campanhaController = {};

campanhaController.createCampanha = function (req,res,next){
    var campanha = new Campanha(req.body);

    campanha.save(function(err){
        if(err){
            next(err);
        }else {
            res.json(campanha);
        }
    });
};

campanhaController.updateCampanha = function(req,res,next){
 Campanha.findByIdAndUpdate(req.body._id, req.body, {new:true}, function(err,campanha){
     if (err){
         next (err);
     }else {
         res.json(campanha);
     }
 });
};

campanhaController.deleteCampanha = function(req,res,next){
    req.campanha.remove(function(err){
        if(err){
            next(err);
        }else {
            res.json(req.campanha);
        }
    });
};

campanhaController.getAllCampanha = function (req,res,next){
    Campanha.find(function(err,campanhas){
        if(err){
            next(err);
        }else{
            res.json(campanhas);
        }
    });
};

campanhaController.getOneCampanha = function(req,res){
    res.json(req.campanha);
};

module.exports = campanhaController;