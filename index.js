import express from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import { readJSON } from './utils/readJson.js'
// import ACCEPTED_ORIGINS from './utils/originsIP.js'

const app = express()

app.use(express.json()) // Esto es para cuando recibimos un req.body y llegue parseado.
app.use(cors(corsMiddleware))
app.disable('x-powered-by') // desactivar una publicidad que meten los des express en la cabezera

app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
