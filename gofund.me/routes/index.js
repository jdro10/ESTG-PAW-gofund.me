var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController.js');

/* GET home page. */
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

module.exports = router;
