/*
Campanha Controller 
Liga o schema donation da pasta models às views
*/

var mongoose = require('mongoose');
var Campanha = require('../models/Donation');

var donationController = {};

//listar donations 

donationController.list = function(req, res){
    Donation.find({}).exec(function(err, donations){
        if(err){
            console.log('Error: ', err);
        }else{
            res.render("../views/", {donations: donations}); //apresentação dos dados || falta criar views de donations
        }
    });
};

//mostra detalhes de uma donations

donationController.show = function(req, res){
    Donation.findOne({_id: req.params.id}).exec(function(err, donation){
        if(err){
            console.log('Error:', err);
        }
        else{
            res.render("../views/", {donation: donation});
        }
    });
};

//cria donation

donationController.create = function(req, res){
    res.render("../views/donationPage"); //criar donation page
};

// guarda nova donation

donationController.save = function(req, res){
    var donation = new Donation(req.body);
    donation.save(function(err){
        if(err){
            console.log('Err:', err);
        }
        else{
            console.log('Donation criada com sucesso!');
            res.redirect("/" + donation._id); //view para donation
        }
    });
};

//elimina donation

donationController.delete = function(req, res){
    Donation.remove({_id: req.params.id}, function(err){
        if(err){
            console.log('Error:', err);
        }
        else{
            console.log('Donation delete!');
            res.redirect('../'); //definir mais views
        }
    });
};

module.exports = donationController;