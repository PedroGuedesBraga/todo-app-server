const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user-model')

//Store id in the cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
}); 

passport.deserializeUser((userId, done) =>{
    User.findById(userId).then(foundUser => {
        done(null, foundUser);
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
    }, (accessToken, refreshToken, profileInfo, done) => {
        User.findOne({googleId: profileInfo.id}).then(foundUser => {
            if(foundUser){
                console.log('User já existe:')
                console.log(foundUser)
                done(null, foundUser); 
            }else{
              
                new User({
                   username: profileInfo.displayName,
                   googleId: profileInfo.id
               }).save().then(newUser => {
                   console.log(newUser)
                   done(null, newUser);
               })
            }
        })
    })
)

