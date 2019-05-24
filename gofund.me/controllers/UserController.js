var mongoose = require('mongoose');
var User = require('../models/User');

var userController = {};

userController.list = function(req, res){
    User.find({}).exec(function(err, users){
        if(err){
            console.log('Error: ', err);
        }
        else{
            res.render("../views/usersDatabase", {users: users});
        }
    });
};

userController.show = function(req, res){
    User.findOne({_id: req.params.id}).exec(function(err, user){
        if(err){
            console.log('Error: ', err);
        }
        else{
            res.render("../views/userDetails", {user: user});
        }
    });
};

userController.create = function(req, res){
    res.render("../views/loginPage");
};

userController.save = function(req, res){
    var user = new User(req.body);
    user.save(function(err){
        if(err){
            console.log('Error: ', err);
        }
        else{
            console.log("Utilizador registado com sucesso!");
            res.redirect("/loginPage");
        }
    });
};

//nao esta pronta
userController.edit = function(req, res){
    User.findOne({_id: req.params._id}).exec(function(err, user){
        if(err){
            console.log('Error: ', err);
        }
        else{
            res.render("../views/users/edit.ejs", {user: user});
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
            res.redirect('../');
        }
    });
};

module.exports = userController;