import { readFile } from 'fs/promises'

// leemos el archivo usando top-level await y con
// codificación utf-8
const file = await readFile('./mocks/movies.json', 'utf-8')

// transformamos el contenido en un JSON
const movies = JSON.parse(file)

export default movies
