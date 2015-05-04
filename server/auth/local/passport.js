var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'Email ou mot de passe incorrect.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Email ou mot de passe incorrect.' });
        }
        if (user.unconfirmed) {
          return done(null, false, {message: 'Veuillez confirmer votre adresse en utilisant le lien qui vous à été envoyé.'})
        }
        return done(null, user);
      });
    }
  ));
};
