var mongoose = require('mongoose');
var User = require('../models/User');
var Campanha = require('../models/Campanha');
var Donation = require('../models/Donation');

var userController = {};

//Lista todos os users registados na plataforma (apenas o admin tem acesso a esta página)
userController.list = function(req, res){
    User.find({}).exec(function(err, users){
        if(err){
            console.log('Error: ', err);
        }
        else{
            res.render("../views/users/usersDatabase", {users: users});
        }
    });
};

//Lista todos os donativos de um determinado user, onde este pode aceder através da página "my profile"
userController.listMyDonations = function(req, res){
    Donation.find({userId: req.user._id}).exec(function (err, exists) {
        if(exists != null){
            var totalGasto = 0;
            for(var i = 0; i < exists.length; i++){
                totalGasto += exists[i].montante;
            }
            res.render("../views/users/userDonations", { exists: exists, totalGasto: totalGasto });
        }else{
            res.redirect('../loginpage');
        }
    });
};

//Mostra os dados de um user na página "my profile"
userController.show = function(req, res){
    User.findOne({_id: req.params.id}).exec(function(err, user){
        if(err){
            console.log('Error: ', err);
        }
        else{
            //console.log(req.user.username);
            res.render("../views/users/userDetails", {user: user});
        }
    });
};

/*Regista um novo user na plataforma
No momento do registo é verificado se o username indicado já existe no website
Caso exista o registo falha.
*/
userController.save = function(req, res){
    var user = new User(req.body);
    User.findOne({username: user.username}, function(err, exists){
        if(exists == null){
            user.save(function(err){
                if(err){
                    console.log('Error: ', err);
                }
                else{
                    console.log("Utilizador registado com sucesso!");
                    res.render("../views/success");
                }
            });
        }else{
            res.render("../views/erro");
        }
    });  
};

//Possibilidade um user apagar o seu registo do website
userController.delete = function(req, res){  
    User.remove({_id: req.params.id}, function(err){
        if(err){
            console.log('Error: ', err);
        }
        else{   
            console.log('Utilizador apagado!');
            res.redirect('/auth/logout');
        }
    });
};

//Possibilidade de um user fazer update as suas informações pessoais
userController.update = function(req, res){
    User.findByIdAndUpdate(req.params.id, { $set: {morada: req.body.morada, password: req.body.password, nif: req.body.nif, email: req.body.email, iban: req.body.iban}},
        { new: true }, function (err, user){
            if(err){
                console.log('Error: ', err);
            }
            res.redirect('/users/show/' + user._id);
            });
};

module.exports = userController;