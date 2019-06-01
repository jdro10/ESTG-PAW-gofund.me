var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController.js');

var authenticated = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

router.get('/loginPage', function(req, res, next) {
  res.render('loginPage');
}); 

router.get('/CampaignPageForMe', function(req, res, next) {	 
  res.render('campaignPage');
});  

router.get('/CampaignPageForFriend', function(req, res, next) {	 
  res.render('campaignPage');
});

router.get('/CampaignPageForInst', function(req, res, next) {	 
  res.render('campaignPage');
});

router.get('/profile', authenticated, function(req, res){
  res.render('../views/users/userDetails', {user: req.user});
});


router.get('/makeDonation', authenticated, function(req, res, next) {	 
  res.render("makeDonation");
});

router.get('/', function(req,res,next){
  res.render('loginPage');
});

module.exports = router;
