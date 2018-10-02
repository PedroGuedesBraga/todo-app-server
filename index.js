const express = require('express')
const morgan = require('morgan') 
const authRoutes = require('./routes/auth-router')
const mongoose = require('mongoose')
const keys = require('./config/keys')

var app = express();

mongoose.connect(keys.databaseURI, {useNewUrlParser: true});

app.use(morgan('tiny'));

app.use('/auth', authRoutes);



app.get('/status', (req, res) => {
    res.send('Server is running on port ' + PORT).status(200);
}); 




var PORT = 5000;
app.listen(PORT, console.log('Server listening PORT: ' + PORT));