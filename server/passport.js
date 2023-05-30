import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


// Configure the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: '720003670148-2rqupqrote7bc33kimqdq0a3lkq68ea3.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://fa67-46-197-1-226.ngrok-free.app/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // This function will be called when a user successfully authenticates with Google
      // You can perform user-related operations here, such as saving the user to your database
      // and calling the `done` function to indicate successful authentication
      // Pass the user object or any relevant information to the `done` function as needed
      return done(null, profile);
    }
  )
);

// Serialize user data into a session
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
// Deserialize user data from a session
passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
export default passport;