var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController.js');

var logged = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

router.get('/loginPage', function(req, res, next) {
  res.render('loginPage', { title: 'Express' });
}); 

router.get('/CampaignPageForMe', function(req, res, next) {	 
  res.render('campaignPage', { title: 'Express' });
});  

router.get('/CampaignPageForFriend', function(req, res, next) {	 
  res.render('campaignPage', { title: 'Express' });
});

router.get('/CampaignPageForInst', function(req, res, next) {	 
  res.render('campaignPage', { title: 'Express' });
});

router.get('/searchDonations', function(req, res, next) {	 
  res.render('donationSearchPage', { title: 'Express' });
});

router.get('/profile', logged, function(req, res){
  res.render('../views/users/userDetails', {user: req.user});
});

router.get('/searchDonations', function(req, res, next) {	 
   res.render("donationSearchPage", {user: user});
});

router.get('/makeDonation', function(req, res, next) {	 
  res.render("makeDonation");
});

router.get('/', function(req,res,next){
  res.render('loginPage');
});

module.exports = router;
