var express = require('express');
var router = express.Router();
var donation = require('../controllers/DonationController');

var loggedAdmin = function(req, res, next){
  if(req.isAuthenticated() && req.user.username === 'admin'){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

router.get('/', loggedAdmin, function(req, res, next) {
  donation.list(req, res);
});

router.post('/save', function(req, res){
    donation.save(req, res);
});

router.post('/savePaypal', function(req, res){
  donation.savePaypal(req, res);
});

router.get('/show/:id', function(req, res){
    donation.show(req, res);
});

module.exports = router;