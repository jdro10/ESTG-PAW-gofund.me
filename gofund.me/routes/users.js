var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  user.list(req, res);
});

router.get('/show/:id', function(req, res){
  user.show(req, res);
});

router.post('/save', function(req, res){
  user.save(req, res);
});

router.post('/delete/:id', function(req, res, next){
  user.delete(req, res);
});

module.exports = router;
