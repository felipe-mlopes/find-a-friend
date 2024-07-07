import { FastifyInstance } from 'fastify'

import { fetchAllPetsController } from './fetch-all-pets.controller'
import { fetchPetsByCharacteristicsController } from './fetch-pet-by-characteristics.controller'
import { getPetDetailsByIdController } from './get-pet-details-by-id.controller'
import { registerPetController } from './register-pet.controller'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import {
  petDetailsSchema,
  petRegistrationSchema,
  petsByCharsSchema,
  petsSchema,
} from '@/docs/swagger'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', { schema: petsSchema }, fetchAllPetsController)
  app.get(
    '/pets/:city',
    { schema: petsByCharsSchema },
    fetchPetsByCharacteristicsController,
  )
  app.get(
    '/pets/pet/:id',
    { schema: petDetailsSchema },
    getPetDetailsByIdController,
  )

  app.post(
    '/pets/create',
    {
      onRequest: [verifyJWT],
      schema: petRegistrationSchema,
    },
    registerPetController,
  )
}
