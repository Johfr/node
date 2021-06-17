const express = require('express')
const router = express.Router()
const stuffCtrl = require('../controllers/stuff')
const auth = require('../middleware/auth')

// Requete POST
router.post('/', auth, stuffCtrl.createThing)

// Get All products
router.get('/', stuffCtrl.getAllThing)

// Get one product
// les ':' dit a express que cette partie de la route est dynamique
// On y a accès via .params
router.get('/:id', stuffCtrl.getOneThing)

// Requete PUT
router.put('/:id', auth, stuffCtrl.updateOneThing)

// Requete Delete
router.delete('/:id', auth, stuffCtrl.deleteOneThing)

// on definit nos routes GET, POST, PATCH etc
// .use va traiter tous types de requête
// .get, .post etc va être une syntaxe spécifique
// router.get('/', (req, res, next) => {
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
// router.use((req, res, next) => {
//     // on peut utiliser .end (node) ou renvoyer un json via .json
//     res.json({ msg: 'requête bien reçu'})
// })
// router.use((req, res, next) => {
//     res.status(201)
//     console.log('3rd log')
// })

module.exports = router