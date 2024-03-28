import express from 'express'
import movies from './movies.js'
import crypto from 'node:crypto'
import v from './schemas/movieSchema.js'

const app = express()

app.disable('x-powered-by') // desactivar una publicidad que meten los des express en la cabezera
app.use(express.json()) // Esto es para cuando recibimos un req.body y llegue parseado.

app.get('/', (req, res) => {
  res.send('<h1>Hello World! </h1>')
})

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp integrado en Express
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) res.json(movie)
  else res.status(404).end()
})

app.post('/movies', (req, res) => {
  const result = v.validateMovie(req.body)

  if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) })

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = v.validatePartialMovie(req.body)
  if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
