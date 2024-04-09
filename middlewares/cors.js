export const corsMiddleware = {
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3001'
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}
