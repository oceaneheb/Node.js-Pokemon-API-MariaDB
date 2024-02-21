//Définir le point de terminaison pour récupérer la liste de tous les pokémons

const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = 'La liste des pokémons n\'a pas pu être récupéré. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
  })
}