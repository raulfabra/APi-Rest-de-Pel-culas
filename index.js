import express from 'express'
// import movies from './movies.js'

import cors from 'cors'

// import { readJSON } from './utils/readJson.js'
// import ACCEPTED_ORIGINS from './utils/originsIP.js'

const app = express()
const movies = readJSON('../mocks/movies.json')

app.disable('x-powered-by') // desactivar una publicidad que meten los des express en la cabezera
app.use(express.json()) // Esto es para cuando recibimos un req.body y llegue parseado.
app.use(cors())

app.get('/movies', todo)

app.get('/movies/:id', todo)

app.post('/movies', todo)

app.delete('/movies/:id', todo)

app.patch('/movies/:id', todo)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
