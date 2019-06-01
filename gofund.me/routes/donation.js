var express = require('express');
var router = express.Router();
var donation = require('../controllers/DonationController');

var authenticatedAdmin = function(req, res, next){
  if(req.isAuthenticated() && req.user.username === 'admin'){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

var authenticated = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

router.get('/', authenticatedAdmin, function(req, res, next) {
  donation.list(req, res);
});

router.post('/save', authenticated, function(req, res){
    donation.save(req, res);
});

router.post('/savePaypal', authenticated, function(req, res){
  donation.savePaypal(req, res);
});

router.get('/show/:id', authenticated, function(req, res){
    donation.show(req, res);
});

module.exports = router;