const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, 'SECRET_TOKEN')
        const userId = decodeToken.userId
        // on vérifie que l'id renvoyé par le front correspond bien à l'id contenu dans le token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserId non valide'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error: error | 'requête non authentifiée' })
    }
}