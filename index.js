const express = require('express')
const morgan = require('morgan') 
const authRoutes = require('./routes/auth-router')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const todoRoutes = require('./routes/todo-routes')

const app = express();

//Enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(keys.databaseURI, {useNewUrlParser: true});

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.cookieKey]

}));

app.use(passport.initialize());
app.use(passport.session())

app.use(morgan('tiny'));

app.use('/auth', authRoutes);
app.use('/panel', todoRoutes);


app.get('/status', (req, res) => {
    res.send('Server is running on port ' + PORT).status(200);
}); 


var PORT = 5000;
app.listen(PORT, console.log('Server listening PORT: ' + PORT));