var express = require('express');
var router = express.Router();
var donationController = require ('../controllers/DonationController');

router.post('/:id', donationController.createDonation);

module.exports = router;