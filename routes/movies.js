import crypto from 'node:crypto'
import v from '../schemas/movieSchema.js'
import { Router } from 'express'
import { readJSON } from './utils/readJson.js'

const movies = readJSON('../mocks/movies.json')
const router = Router()

router.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }
  res.json(movies)
})

router.get('/:id', (req, res) => { // path-to-regexp integrado en Express
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) res.json(movie)
  else res.status(404).end()
})

router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie Not found' })
  }

  movies.splice(movieIndex, 1)
  return res.status(204).json({ message: 'Movie deleted' })
})

router.patch('/:id', (req, res) => {
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
