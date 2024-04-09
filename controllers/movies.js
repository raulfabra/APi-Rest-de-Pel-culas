import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movieSchema.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    // Que es lo que se renderiza?
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) res.json(movie)
    else res.status(404).end()
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) })

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (!result) return res.status(404).json({ error: 'Movie Not found' })

    return res.status(204).json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const { id } = req.params

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
