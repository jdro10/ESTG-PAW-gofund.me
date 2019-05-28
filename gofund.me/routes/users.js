var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController.js');

var loggedAdmin = function(req, res, next){
  if(req.isAuthenticated() && req.user.username === 'admin'){
    next();
  }else{
    res.redirect('/loginPage');
  }
}

var logged = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('login');
  }
}

/* GET users listing. */
router.get('/', loggedAdmin, function(req, res, next) {
  user.list(req, res);
});

router.get('/show/:id', logged, function(req, res){
  user.show(req, res);
});

router.post('/save', function(req, res){
  user.save(req, res);
});

router.post('/delete/:id', function(req, res, next){
  user.delete(req, res);
});

router.post('/update/:id', function(req, res){
  user.update(req, res);
});

module.exports = router;
