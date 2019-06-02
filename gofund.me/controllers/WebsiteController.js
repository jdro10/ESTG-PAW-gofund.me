var mongoose = require('mongoose');
var Campanha = require('../models/Campanha');
var Donation = require('../models/Donation');
var User = require('../models/User');

var websiteController = {};

websiteController.dashboard = function (req, res) {
    User.find({}).exec(function (err, users) {
        if (err) {
            console.log('Error: ', err);
        } else {
            Campanha.find({}).exec(function (err, campanhas) {
                if(err){
                    console.log('Error:', err);
                }else{
                    Donation.find({}).exec(function(err, donations){
                        var totalUsers = users.length;
                        var totalCampanhas = campanhas.length;
                        var totalDonations = donations.length;
                        var totalMontanteDonations = 0;
                        var totalDonationsProcessing = 0;
                        var totalDonationsCanceled = 0;
                        for(var i = 0; i < donations.length; i++){
                            if(donations[i].estado === 'processed'){
                                totalMontanteDonations += donations[i].montante;
                            }
                            if(donations[i].estado === 'processing'){
                                totalDonationsProcessing += donations[i].montante;
                            }
                            if(donations[i].estado === 'canceled'){
                                totalDonationsCanceled += donations[i].montante;
                            }
                        }

                        var active = 0;
                        var disabled = 0;
                        for(var j = 0; j < campanhas.length; j++){
                            if(campanhas[j].estado === 'Active'){
                                active++;
                            }
                            if(campanhas[j].estado === 'Disabled'){
                                disabled++;
                            }
                        }

                        res.render('../views/dashboard', { totalUsers: totalUsers, totalCampanhas: totalCampanhas, totalDonations: totalDonations,
                                   totalMontanteDonations : totalMontanteDonations, active:active, disabled:disabled, 
                                    totalDonationsProcessing:totalDonationsProcessing, totalDonationsCanceled:totalDonationsCanceled});
                    });
                }
            });
        }
    });
}

module.exports = websiteController;