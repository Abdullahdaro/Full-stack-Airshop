import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import UserModel from './models/user.js';
import dotenv from 'dotenv';
dotenv.config();
const { REACT_APP_GOOGLE_ID, REACT_APP_GOOGLE_SECRET } = process.env;

// Serialize user data into a session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Configure the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: '720003670148-2rqupqrote7bc33kimqdq0a3lkq68ea3.apps.googleusercontent.com',
      clientSecret: 'hnE2rWmHbmPjCvneqw4Bo7',
      callbackURL: '/auth/google/callback',
    },
     (accessToken, refreshToken, profile, done) => {
      UserModel.findOne({id: profile.id}).then((currentUser) => {
        if(currentUser){
            // already have this user
            console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new UserModel({
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
      });
    }
  )
);




export default passport;
