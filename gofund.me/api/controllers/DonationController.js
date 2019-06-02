var mongoose = require("mongoose");
var Donation = require('../../models/Donation');
var Campanha = require("../../models/Campanha");

var donationController = {};

donationController.createDonation = function (req,res,next){
    var donation = new Donation(req.body);
    Campanha.findOne({_id: req.params.id}, function(err, found){
        if(found){
            donation.save(function(err){
                if(err){
                    next(err);
                }else {
                    res.json(donation);
                }
            });
        }else{
            res.json({erro})
        }
    })
};

module.exports = donationController;