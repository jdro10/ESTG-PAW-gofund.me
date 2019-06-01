var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController.js');

var authenticatedAdmin = function(req, res, next){
  if(req.isAuthenticated() && req.user.username === 'admin'){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

var authenticated = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

router.get('/', authenticatedAdmin, function(req, res, next) {
  user.list(req, res);
});

router.get('/myDonations', authenticated, function(req, res, next) {
  user.listMyDonations(req, res);
});

router.get('/show/:id', authenticated, function(req, res){
  user.show(req, res);
});

router.post('/save', authenticated, function(req, res){
  user.save(req, res);
});

router.post('/delete/:id', authenticated, function(req, res, next){
  user.delete(req, res);
});

router.post('/update/:id', authenticated, function(req, res){
  user.update(req, res);
});

module.exports = router;
