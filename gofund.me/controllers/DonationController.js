/*
Campanha Controller 
Liga o schema donation da pasta models às views
*/

var mongoose = require('mongoose');
var Donation = require('../models/Donation');
var Campanha = require('../models/Campanha');

var donationController = {};

//listar donations 

donationController.list = function(req, res){
    Donation.find({}).exec(function(err, donations){
        if(err){
            console.log('Error: ', err);
        }else{
            res.render("../views/donation/donationsDatabase", {donations: donations}); //apresentação dos dados || falta criar views de donations
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
            res.render("../views/donation/donationDetails", {donation: donation});
        }
    });
};

// guarda nova donation

donationController.save = function(req, res){
    var donation = new Donation(req.body);
    Campanha.findOne({title: donation.campanha}, function(err, exists){
        if(exists != null){
            donation.save(function(err){
                if(err){
                    console.log('Err:', err);
                }
                else if(donation.montante > 0 && exists.estado != 'Desativado'){  
                    console.log('Donation criada com sucesso!');
                    res.redirect("/donation/show/" + donation._id); //view para donation
                }else{
                    res.render('../views/erro');
                }
            });
        }else{
            res.render('../views/erro');
        }
    });
};

module.exports = donationController;