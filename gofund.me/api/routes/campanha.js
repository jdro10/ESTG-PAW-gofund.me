var express = require('express');
var router = express.Router();
var campanhaController = require ('../controllers/CampanhaController');

//campanhas

router.get('/', campanhaController.getAllCampanhas);
router.get('/estado/:id', campanhaController.getCampanhasState);

module.exports = router;