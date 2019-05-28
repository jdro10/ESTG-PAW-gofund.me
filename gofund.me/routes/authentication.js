var express = require('express');
var router = express.Router();
var User = require('../models/User');

module.exports = function(passport){
    router.post('/login', passport.authenticate('local', {
        successRedirect:'./login',
        failureRedirect:'./views/erro'       
    }), function(req, res) {
        res.send('teste');
    });
    
    return router;
};