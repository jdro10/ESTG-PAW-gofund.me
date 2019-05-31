var express = require('express');
var router = express.Router();
var campanha = require('../controllers/CampanhaController');

var logged = function(req, res, next){
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

router.post('/save', logged, function(req, res){
  campanha.save(req, res);
});

router.get('/show/:id', function(req, res){
  campanha.show(req, res);
});

router.post('/delete/:id', function(req, res, next){
  campanha.delete(req, res);
});

router.post('/update/:id', function(req, res){
  campanha.update(req, res);
});

module.exports = router;