var express = require('express');
var router = express.Router();
var campanha = require('../controllers/CampanhaController');

router.get('/', function(req, res, next) {
  campanha.list(req, res);
});

router.post('/save', function(req, res){
  campanha.save(req, res);
});

router.get('/show/:id', function(req, res){
  campanha.show(req, res);
});

router.post('/delete/:id', function(req, res, next){
  campanha.delete(req, res);
});

module.exports = router;