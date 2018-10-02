const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user-model')

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
    }, (accessToken, refreshToken, profileInfo, done) => {
        User.findOne({googleId: profileInfo.id}).then(foundUser => {
            if(foundUser){
                console.log('User já existe:')
                console.log(foundUser)
            }else{
                //Salva usuario no bd, pois ainda nao existe um usuario com esse googleId no bd
                new User({
                   username: profileInfo.displayName,
                   googleId: profileInfo.id
               }).save().then(newUser => {
                   console.log(newUser)
               })
            }
        })
    })
)

