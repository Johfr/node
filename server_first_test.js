const http = require('http')
// import de notre app qui va gérer toutes nos routes
const app = require('./app')

// On définit le port que express doit surveiller
app.set(process.env.PORT || 3000)
// app renvoit une fct avec 2 paramètres comme node. Ici c'est express qui va gérer tout cela
const server = http.createServer(app)
// Code Node qu'on remplace par express ci dessus
// const server = http.createServer((req, res) => {
//     res.end('Serveur actif et fonctionnel avec nodemon')
// })

server.listen(process.env.PORT || 3000)