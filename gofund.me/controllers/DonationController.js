var mongoose = require('mongoose');
var Donation = require('../models/Donation');
var Campanha = require('../models/Campanha');
var paypal = require('paypal-rest-sdk');

var donationController = {};

//Lista todos os donativos efetuados no website
donationController.list = function(req, res){
    Donation.find({}).exec(function(err, donations){
        if(err){
            console.log('Error: ', err);
        }else{
            res.render("../views/donation/donationsDatabase", {donations: donations}); //apresentação dos dados || falta criar views de donations
        }
    });
};

//Lista todos os detalhes de uma doação
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

//Criação de uma doação
/* Aqui existem várias verificações para que uma doação seja válida.
Para que uma doação seja bem sucedida a camapnha tem de existir,
depois é restringido ao criador da camapnha doar na sua própria campanha
e também é verificado o estado da campanha, caso esteja ativa é possivel doar
caso contrário o donativo é inválido */
donationController.save = function(req, res){
    var donation = new Donation(req.body);
    var user = req.user.username;
    var userId = req.user._id;
    donation.username = user;
    donation.userId = userId;
    donation.estado = 'processing';
    console.log(donation.estado);
    Campanha.findOne({title: donation.campanha}, function(err, exists){
        if(exists != null && req.user._id != exists.creatorId && exists.estado !== 'Disabled'){
            donation.save(function(err){
                if(err){
                    console.log('Err:', err);
                }
                else if(donation.montante > 0){  
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

//Possibilidade doar através do paypal
donationController.savePaypal = function (req, res) {
    var donation = new Donation(req.body);
    var user = req.user.username;
    var userId = req.user._id;
    donation.username = user;
    donation.userId = userId;
    Campanha.findOne({ title: donation.campanha }, function (err, exists) {
        if (exists != null && req.user._id != exists.creatorId && exists.estado !== 'Disabled') {
            var create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:8080/donation/show/" + donation._id,
                    "cancel_url": "http://localhost:8080/erro"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": exists.title,
                            "sku": "item",
                            "price": donation.montante,
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": donation.montante
                    },
                    "description": "Donation"
                }]
            };

            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for (var i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                            donation.estado = 'processed';
                            donation.save(function (err) {
                                if (err) {
                                    console.log('Err:', err);
                                }
                                else if (donation.montante > 0) {
                                    console.log('Donation criada com sucesso!');
                                } else {
                                    res.render('../views/erro');
                                }
                            });
                        }
                    }
                }
            });
        } else {
            res.render('../views/erro');
        }
    });
};

//Administrador da campanha escolhe se quer aprovar, caso afirmativo a donation passa a estado - processed
donationController.approve = function (req, res) {
    Donation.findByIdAndUpdate(req.params.id, { $set: { estado: 'processed' } },
        { new: true }, function (err, user) {
            if (err) {
                console.log(err);
            }
            res.redirect('/campaign');
        });
};

//Administrador da campanha escolhe se quer cancelar, caso afirmativo a donation passa a estado - canceled
donationController.cancel = function (req, res) {
    Donation.findByIdAndUpdate(req.params.id, { $set: { estado: 'canceled' } },
        { new: true }, function (err, user) {
            if (err) {
                console.log(err);
            }
            res.redirect('/campaign');
        });
}

module.exports = donationController;