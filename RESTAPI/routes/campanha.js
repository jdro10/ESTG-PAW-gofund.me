var express = require('express');
var router = express.Router();
var campanhaController = require ("../controllers/campanhaController.js");

//campanhas

router.get('/campanha', campanhaController.getAllCampanha);
router.post('/campanha', campanhaController.createCampanha);

router.get('/campanha/:campanhaId', campanhaController.getOneCampanha);
router.put('/campanha/:campanhaId', campanhaController.updateCampanha);
router.delete('/campanha/:campanhaId', campanhaController.deleteCampanha);



module.exports = router;