const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

//Ici nous placerons nos futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
//Pour ajouter un pokémon -> utiliser Insomnia

//On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))
 








// --------------- Fichier précédent -------------------------------


// const express = require('express') 
// const morgan = require('morgan')
// let pokemons = require('./src/db/mock-pokemon.js')

// //Conversion JSON - string
// const bodyParser = require('body-parser')

// //Méthodes
// const { success, getUniqueId } = require('./helper.js')

// //ORM
// const { Sequelize, DataTypes } = require('sequelize')
// const PokemonModel = require('./src/models/pokemon')

// const app = express() 
// const port = 3000 

// //CONNEXION BDD MARIADB
// const sequelize = new Sequelize(
//     'pokedex',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timzezone: 'Etc/GMT-2'
//         },
//         logging: false
//     }
// )

// sequelize.authenticate()
// .then(_ => console.log('La connexion a la BDD a bien été établie.'))
// .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

//Instancier un model Pokemon pour créer une nouvelle table
// const Pokemon = PokemonModel(sequelize, DataTypes)
// //Synchroniser la demande avec l'état de la BDD
// sequelize.sync({force: true})
//     .then(_ => { 
//         console.log('La base de données Pokedex a bien été synchronisée.')

//     //Ajouter la liste des 12 pokémons 
//     pokemons.map(pokemon => {
//         Pokemon.create({
//             name: pokemon.name,
//             hp: pokemon.hp,
//             cp: pokemon.cp,
//             picture: pokemon.picture,
//             types: pokemon.types.join()
//         }).then(pokemon => {
//             console.log(pokemon.toJSON())
//         })
//     })

//     //Ajouter 1 pokemon
//     Pokemon.create({
//         name: 'Bulbizzare',
//         hp: 35,
//         cp: 5,
//         picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
//         types: ["Feu", "Poison"].join() //convertir en string
//         //console.log(types.split(",")) --> convertir en JSON
//     }).then(bulbizzare => console.log(bulbizzare.toJSON()))

// })


//MIDDLEWARE

// app
//     .use(morgan('dev'))
//     .use(bodyParser.json()) 

//POINTS DE TERMINAISON

// app.get('/', (req, res) => res.send('Hello again Express 2 !')) 

//Afficher les pokémons par id
// app.get('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id) 
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     const message = 'Un pokémon a bien été trouvé'
//     res.json(success(message, pokemon))
// })

//Afficher les 12 pokémons au format JSON
// app.get('/api/pokemons', (req, res) => {
//     const message = `La liste des pokemons a bien été retournée. Il y a ${pokemons.length} pokémons dans la pokedex.`
//     res.json(success(message, pokemons))
// })

//Ajouter un pokémon à l'API Rest
// app.post('/api/pokemons', (req, res) => {
//     const id = getUniqueId(pokemons)
//     const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `Le pokemon ${pokemonCreated.name} a bien été ajouté.`
//     res.json(success(message, pokemonCreated))
// })

//Moifier les données d'un pokémon
// app.put('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = {...req.body, id: id}
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`
//     res.json(success(message, pokemonUpdated))
// })

//Supprimer un pokémon
// app.delete('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id)
//     pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`
//     res.json(success(message, pokemonDeleted))
// })


// app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`)) //Démarrer l'API sur le port 3000 et afficher un message dans la ligne de commande

