var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message: 'Username incorreto'});
            }
            if(!user.validPassword(password)){
                return done(null, false, {message: 'Password incorreta'});
            }
            return done(null, user);
        });
    }
));