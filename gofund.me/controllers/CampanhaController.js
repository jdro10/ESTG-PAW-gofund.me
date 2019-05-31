/*
Campanha Controller 
Liga o schema campanha da pasta models às views
*/

var mongoose = require('mongoose');
var Campanha = require('../models/Campanha');
var Donation = require('../models/Donation');
var User = require('../models/User');

var campanhaController = {};

//listar campanhas 

campanhaController.list = function (req, res) {
    Campanha.find({}).exec(function (err, campanhas) {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render("../views/campaign/campaignsDatabase", { campanhas: campanhas }); //apresentação dos dados
        }
    });
};

campanhaController.listActive = function (req, res) {
    Campanha.find({}).exec(function (err, campanhas) {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render("../views/campaign/activeCampaign", { campanhas: campanhas }); //apresentação dos dados
        }
    });
};

campanhaController.listDonators = function (req, res) {
    Campanha.findOne({ _id: req.params.id }).exec(function (err, campanha) {
        if (err) {
            console.log('Error:', err);
        }
        else {
            Donation.find({ campanha: campanha.title }).exec(function (err, existsDonator) {
                if (existsDonator == null) {
                    res.redirect('../');
                } else {
                    res.render("../views/campaign/campaignDonators", { existsDonator: existsDonator });
                }
            });
        }
    });
};

//mostra detalhes de uma campanha

campanhaController.show = function (req, res) {
    Campanha.findOne({ _id: req.params.id }).exec(function (err, campanha) {
        if (err) {
            console.log('Error:', err);
        }
        else {
            Donation.find({ campanha: campanha.title }).exec(function (err, exists) {
                if (exists == null) {
                    campanha.valorCorrente = 0;
                    res.render("../views/campaign/campaignDetail", { campanha: campanha });
                } else {
                    console.log('length: ' + exists.length);
                    var montante = 0;
                    for (var i = 0; i < exists.length; i++) {
                        montante += exists[i].montante;
                    }
                    campanha.valorCorrente = montante;
                    res.render("../views/campaign/campaignDetail", { campanha: campanha });
                }
            });
        }
    });
};

campanhaController.save = function (req, res) {
    var campanha = new Campanha(req.body);
    var user = req.user.username;
    var userId = req.user._id;
    campanha.creatorId = userId;
    campanha.creatorUsername = user;
    Campanha.findOne({ title: campanha.title }, function (err, exists) {
        if (exists == null) {
            campanha.save(function (err) {
                if (err) {
                    console.log('Err:', err);
                }
                else {
                    console.log('Campanha criada com sucesso!');
                    res.redirect("/campaign/show/" + campanha._id); //redirect para a campanha criada
                }
            });
        } else {
            res.render('../views/erro');
        }
    });
};

//elimina campanha

campanhaController.delete = function (req, res) {
    Campanha.findOne({ _id: req.params.id }, function (err, exists) {
        if (exists.creatorUsername === req.user.username) {
            Campanha.remove({ _id: req.params.id }, function (err) {
                if (err) {
                    console.log('Error:', err);
                }
                else {
                    console.log('Campanha apagada!');
                    res.redirect('../');
                }
            });
        } else {
            res.redirect('../');
        }
    });

};

campanhaController.update = function (req, res) {
    Campanha.findOne({ _id: req.params.id }, function (err, exists) {
        if (exists.creatorUsername === req.user.username) {
            Campanha.findByIdAndUpdate(req.params.id, { $set: { estado: 'Desativado' } },
                { new: true }, function (err, campanha) {
                    if (err) {
                        console.log('Error: ', err);
                    }
                    res.redirect('/campaign/show/' + campanha._id);
                });
        } else {
            res.redirect('../');
        }
    });
};

module.exports = campanhaController;