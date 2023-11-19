import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsByCharacteristicsService } from '@/services/factories/make-search-pets-by-characteristics-service'

export async function searchByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),
  })

  const searchPetsQuerySchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).nullable(),
    energyLevel: z.enum(['CALM', 'PEACEFUL', 'FUSSY']).nullable(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).nullable(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable(),
    environment: z.enum(['TIGHT', 'NORMAL', 'WIDE']).nullable(),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)

  const { age, energyLevel, environment, independenceLevel, size } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetService = makeSearchPetsByCharacteristicsService()

  const { pets } = await searchPetService.execute({
    city,
    age,
    energyLevel,
    environment,
    independenceLevel,
    size,
  })

  return reply.status(200).send({ pets })
}
