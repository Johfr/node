const express = require('express')
const app = express()

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
    console.log(req.body)
    res.status(201).json({
        msg: 'validate'
    })
})

// on definit nos routes GET, POST, PATCH etc
// .use va traiter tous types de requête
// .get, .post etc va être une syntaxe spécifique
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'id01',
            title: 'Mon 1er objet',
            description: 'Les infos du 1er objet',
            imageUrl: '',
            price: 2900,
            userId: 'qsd'
        },
        {
            _id: 'id02',
            title: 'Mon 2eme objet',
            description: 'Les infos du 2eme objet',
            imageUrl: '',
            price: 5900,
            userId: 'qsd'
        }
    ]
    res.status(200).json(stuff)
    next()
})
// app.use((req, res, next) => {
//     // on peut utiliser .end (node) ou renvoyer un json via .json
//     res.json({ msg: 'requête bien reçu'})
// })
// app.use((req, res, next) => {
//     res.status(201)
//     console.log('3rd log')
// })
module.exports = app