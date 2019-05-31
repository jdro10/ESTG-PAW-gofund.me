var express = require('express');
var router = express.Router();
var donation = require('../controllers/DonationController');

router.get('/', function(req, res, next) {
  donation.list(req, res);
});

router.post('/save', function(req, res){
    donation.save(req, res);
});

router.get('/show/:id', function(req, res){
    donation.show(req, res);
});

module.exports = router;