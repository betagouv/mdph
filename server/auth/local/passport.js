import passport from 'passport';
import {Strategy} from 'passport-local';

export function setup(User) {
  passport.use(new Strategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User
        .findOne({
          email: email.toLowerCase()
        })
        .populate('mdph zipcode')
        .select('+hashedPassword +salt')
        .exec(function(err, user) {
          if (err) return done(err);

          if (!user) {
            return done(null, false, { message: 'Email ou mot de passe incorrect.' });
          }

          if (user.isLocked) {
            return done({message : 'locked', lockUntil : user.lockUntil, loginAttempts : user.loginAttempts});
          }

          if (!user.authenticate(password)) {
            user.incLoginAttempts(false);
            if (user.isLocked) {
              return done({message : 'locked', lockUntil : user.lockUntil, loginAttempts : user.loginAttempts});
            }
            return done(null, false, { message: 'Email ou mot de passe incorrect.' });
          }

          user.incLoginAttempts(true);
          return done(null, user);
        });
    }

  ));
}
