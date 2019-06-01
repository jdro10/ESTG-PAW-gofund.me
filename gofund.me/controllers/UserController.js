var mongoose = require('mongoose');
var User = require('../models/User');
var Campanha = require('../models/Campanha');
var Donation = require('../models/Donation');

var userController = {};

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