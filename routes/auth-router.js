const router = require('express').Router();
const passport = require('passport')
const GoogleStrategy = require('../config/passport-setup')

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/logout', (req, res) => {
    res.send('Loggin out');
});

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user)
});

router.get('/test', (req, res) => {
    res.send('Usuario logado: ' + req.user);
});

module.exports = router;