const Thing = require('../models/Thing.js')

exports.createThing = (req, res, next) => {
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
}

exports.getAllThing = (req, res, next) => {
    Thing.find()
    .then((things) => res.status(201).json(things))
    .catch(error => res.status(400).json(error))
}

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then((oneThing) => res.status(201).json(oneThing))
    .catch(error => res.status(400).json(error))
    console.log('find One')
}

exports.updateOneThing = (req, res, next) => {
    // Put supprime toutes les datas, il est important de bien renvoyé l'id
    Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        .then(() => res.status(201).json({ msg: 'Updated' }))
        .catch(error => res.status(400).json(error))
    console.log(req.body)
}

exports.deleteOneThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(201).json({ msg: 'Deleted' }))
        .catch(error => res.status(400).json(error))
    console.log(req.body)
}
