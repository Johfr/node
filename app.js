const express = require('express')
const mongoose = require('mongoose')
const app = express()
const stuffRoute = require('./routes/stuff')


// Connexion à mongoose
mongoose.connect('mongodb+srv://joh:0000@cluster0.d7kfh.mongodb.net/node-formation?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
 })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers de l'api pour passer le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// on utilise body-parser pour traiter la requête et transformer les données en JSOn
app.use(express.json())

app.use('/api/stuff', stuffRoute)

module.exports = app