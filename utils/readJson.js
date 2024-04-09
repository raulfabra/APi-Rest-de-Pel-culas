// COMO LEER UN JSON CON ESMODULES RECOMENDADO POR AHORA
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
