import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from './models/user.js'


// Configure the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: '720003670148-2rqupqrote7bc33kimqdq0a3lkq68ea3.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
      return done(null, profile);
    }
  )
);

// Serialize user data into a session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});
  
export default passport;