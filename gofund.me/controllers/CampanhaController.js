var mongoose = require('mongoose');
var Campanha = require('../models/Campanha');
var Donation = require('../models/Donation');
var User = require('../models/User');

var campanhaController = {};

//Lista de todas as campanhas no site
campanhaController.list = function (req, res) {
    Campanha.find({}).exec(function (err, campanhas) {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render("../views/campaign/campaignsDatabase", { campanhas: campanhas }); //apresentação dos dados
        }
    });
};

//Lista de todas as camapnhas ativas no site
campanhaController.listActive = function (req, res) {
    Campanha.find({}).exec(function (err, campanhas) {
        if (err) {
            console.log('Error: ', err);
        } else {
            res.render("../views/campaign/activeCampaign", { campanhas: campanhas }); //apresentação dos dados
        }
    });
};

//Lista de todos os doadores de uma certa campanha
/*A campanha é mostrada através do seu próprio id, depois é efetuado uma procura de todos os donativos
 com o título da campanha identificada. Caso sejam encontrados doadores (existsDonatos) a página 
 "campaignDonators.ejs" é chamada e aí é mostrada uma lista de todos os doadores e respetivos valores.
*/
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

//Lista todas os donativos que estão em estado de processamento
/* A campanha é identificada pelo seu id, depois é efetuado uma procura de todos os donativos
com o titulo da campanha, e a página "incomingDonations.ejs" é chamada e mostra todos os
donativos em estado de processamento. Também é passado para esta mesma página o user que está loggado
e o id do criador da campanha, pois apenas o criador da campanha pode aceitar/cancelar um donativo*/
campanhaController.incDonators = function (req, res) {
    Campanha.findOne({ _id: req.params.id }).exec(function (err, campanha) {
        if (err) {
            console.log('Error:', err);
        }
        else {
            var loggedUser = req.user._id;
            var campanhaCreator = campanha.creatorId;
            Donation.find({ campanha: campanha.title }).exec(function (err, incDonators) {
                if (incDonators == null) {
                    res.redirect('../');
                } else {
                    res.render("../views/campaign/incomingDonations", { incDonators: incDonators, loggedUser:loggedUser, campanhaCreator:campanhaCreator});
                }
            });
        }
    });
};

//Lista todos os detalhes de uma campanha
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
                    console.log(req.user._id);
                    console.log(campanha.creatorId);
                    console.log('length: ' + exists.length);
                    var montante = 0;
                    for (var i = 0; i < exists.length; i++) {
                        if (exists[i].estado === 'processed') {
                            montante += exists[i].montante;
                        }
                    }
                    campanha.valorCorrente = montante;
                    res.render("../views/campaign/campaignDetail", { campanha: campanha });
                }
            });
        }
    });
};

//Criação de uma campanha
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

//Possibilidade de apagar uma campanha, caso uma campanha tenham pelo menos 1 donativo, é impossivel elimina-la
campanhaController.delete = function (req, res) {
    Campanha.findOne({ _id: req.params.id }, function (err, exists) {
        if (exists.creatorId === req.user._id) {
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

/*Possibilidade de desativar uma campanha, caso esta tenha pelo menos 1 donativo,
sendo posteriormente impossivel doar a uma campanha desativada */
campanhaController.update = function (req, res) {
    Campanha.findOne({ _id: req.params.id }, function (err, exists) {
        if (exists.creatorId === req.user._id) {
            Campanha.findByIdAndUpdate(req.params.id, { $set: { estado: 'Disabled' } },
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