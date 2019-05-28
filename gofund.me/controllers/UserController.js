/*
Campanha Controller 
Liga o schema user da pasta models às views
*/

var mongoose = require('mongoose');
var User = require('../models/User');

var userController = {};

//lista os users 

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

//mostra detalhes de um user

userController.show = function(req, res){
    User.findOne({_id: req.params.id}).exec(function(err, user){
        if(err){
            console.log('Error: ', err);
        }
        else{
            res.render("../views/users/userDetails", {user: user});
        }
    });
};

//guarda novo user

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
                    res.redirect("/loginPage");
                }
            });
        }else{
            res.render("../views/erro");
        }
    });  
};

//delete de um user

userController.delete = function(req, res){
    User.remove({_id: req.params.id}, function(err){
        if(err){
            console.log('Error: ', err);
        }
        else{
            console.log('Utilizador apagado!');
            res.redirect('../');
        }
    });
};

userController.update = function(req, res){
    User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username, morada: req.body.morada, password: req.body.password, nif: req.body.nif, email: req.body.email}},
        { new: true }, function (err, user){
            if(err){
                console.log('Error: ', err);
            }
            res.redirect('/users/show/' + user._id);
        });
};

module.exports = userController;