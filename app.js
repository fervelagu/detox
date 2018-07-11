const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
require ('hbs');

mongoose.connect('mongodb://localhost:27017/detox', { useNewUrlParser: true }, (err)=>{
    if(err) return console.log('Error ', err)
    console.log('conectado a la db');
});


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//routes
app.get('/', (req, res)=>{
    res.render('home');
});

const foodRoute = require('./routes/food');
app.use('/food', foodRoute);

app.listen(port, ()=>{
    console.log('Corriendo en el 3000');
});