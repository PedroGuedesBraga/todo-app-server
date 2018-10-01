const express = require('express')
const morgan = require('morgan') 
const authRoutes = require('./routes/auth-router')

var app = express();


app.use(morgan('tiny'));

app.use('/auth', authRoutes);



app.get('/status', (req, res) => {
    res.send('Server is running on port ' + PORT).status(200);
}); 




var PORT = 5000;
app.listen(PORT, console.log('Server listening PORT: ' + PORT));