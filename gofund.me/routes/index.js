var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/LoginPage', function(req, res, next) {
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

module.exports = router;
