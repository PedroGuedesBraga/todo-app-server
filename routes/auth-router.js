const router = require('express').Router();
const passport = require('passport')
const GoogleStrategy = require('../config/passport-setup')

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/logout', (req, res) => {
    res.send('Loggin out');
});

module.exports = router;