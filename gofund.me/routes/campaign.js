var express = require('express');
var router = express.Router();
var campanha = require('../controllers/CampanhaController');

var authenticated = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

router.get('/', function(req, res, next) {
  campanha.list(req, res);
});

router.get('/active', function(req, res, next) {
  campanha.listActive(req, res);
});

router.get('/campaignDonators/:id', function(req, res, next) {
  campanha.listDonators(req, res);
});

router.get('/incomingDonations/:id', function(req, res, next) {
  campanha.incDonators(req, res);
});

router.post('/save', authenticated, function(req, res){
  campanha.save(req, res);
});

router.get('/show/:id', authenticated, function(req, res){
  campanha.show(req, res);
});

router.post('/delete/:id', authenticated, function(req, res, next){
  campanha.delete(req, res);
});

router.post('/update/:id', authenticated, function(req, res){
  campanha.update(req, res);
});

module.exports = router;