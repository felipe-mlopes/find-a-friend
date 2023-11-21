import { FastifyInstance } from 'fastify'

import { searchByCity } from './search-by-city'
import { searchByCharacteristics } from './search-by-characteristics'
import { details } from './details'
import { create } from './create'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', searchByCity)
  app.get('/pets/search/:city', searchByCharacteristics)
  app.get('/pets/pet/:id', details)

  app.post('/pets/create', { onRequest: [verifyJWT] }, create)
}
