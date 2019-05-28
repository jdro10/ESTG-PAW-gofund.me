var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        done(null, user);  
    });

    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({username: username}, function(err, user){
            if(err){
                console.log(err);
            }else{
                if(user){
                    if(password === user.password){
                        done(null, user);
                    }else{
                        done(null, false);
                    }
                }else{
                    done(null, false);
                }
            }
        });
    }));
}