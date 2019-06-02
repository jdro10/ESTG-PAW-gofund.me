var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(passport){
    //Aqui é guardado na sessão o utilizador que está loggado
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        done(null, user);  
    });

    /*Quando é efetuado um login é verificado se o username existe,
    caso exista é verificado se a password coincide com a pasword 
    guardada e associada ao username indicado, caso contrário o login falha*/
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