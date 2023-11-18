import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { register } from './register'
import { searchByCity } from './search-by-city'
import { searchByCharacteristics } from './search-by-characteritics'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:city', searchByCity)
  app.get('/pets/search/:city', searchByCharacteristics)
  app.get('/pet/:id', details)

  app.post('/register-pet', { onRequest: [verifyJWT] }, register)
}
