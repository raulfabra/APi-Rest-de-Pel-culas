import { readJSON } from '../utils/readJson'

const movies = readJSON('../mocks/movies.json')

export class MovieModel {
  static getAll ({ genre }) {
    if (genre) {
      // aqui esta la informacion de como se filtran los datos
      // y de donde se recuperan
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
      res.json(filteredMovies)
    }
  }
}
