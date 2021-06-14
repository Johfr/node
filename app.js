const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Thing = require('./models/Thing.js')

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

// Requete POST
app.post('/api/stuff', (req, res, next) => {
    // on crée une nouvelle instance de Thing
    const thing = new Thing({
        ...req.body
    })
    // on sauvegarde dans la bdd
    // une promesse est renvoyée
    thing.save()
        .then(() => res.status(201).json({ msg: 'Saved' }))
        .catch(error => res.status(400).json(error))
    console.log(req.body)
})

// Get All products
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then((things) => res.status(201).json(things))
    .catch(error => res.status(400).json(error))
})

// Get one product
// les ':' dit a express que cette partie de la route est dynamique
// On y a accès via .params
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then((oneThing) => res.status(201).json(oneThing))
    .catch(error => res.status(400).json(error))
    console.log('find One')
})

// Requete PUT
app.put('/api/stuff/:id', (req, res, next) => {
    // Put supprime toutes les datas, il est important de bien renvoyé l'id
    Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({ msg: 'Updated' }))
        .catch(error => res.status(400).json(error))
    console.log(req.body)
})

// Requete Delete
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(201).json({ msg: 'Deleted' }))
        .catch(error => res.status(400).json(error))
    console.log(req.body)
})

// on definit nos routes GET, POST, PATCH etc
// .use va traiter tous types de requête
// .get, .post etc va être une syntaxe spécifique
// app.get('/api/stuff', (req, res, next) => {
//     const stuff = [
//         {
//             _id: 'id01',
//             title: 'Mon 1er objet',
//             description: 'Les infos du 1er objet',
//             imageUrl: '',
//             price: 2900,
//             userId: 'qsd'
//         },
//         {
//             _id: 'id02',
//             title: 'Mon 2eme objet',
//             description: 'Les infos du 2eme objet',
//             imageUrl: '',
//             price: 5900,
//             userId: 'qsd'
//         }
//     ]
//     res.status(200).json(stuff)
//     next()
// })
// app.use((req, res, next) => {
//     // on peut utiliser .end (node) ou renvoyer un json via .json
//     res.json({ msg: 'requête bien reçu'})
// })
// app.use((req, res, next) => {
//     res.status(201)
//     console.log('3rd log')
// })
module.exports = app