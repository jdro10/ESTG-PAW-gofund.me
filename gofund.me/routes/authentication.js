var express = require('express');
var router = express.Router();
var User = require('../models/User');

module.exports = function(passport){
    router.post('/login', passport.authenticate('local', {
        successRedirect:'../loginPage',
        failureRedirect:'../loginPage',     
    }), function(req, res) {
        res.send('teste');
    });
    
    return router;
};