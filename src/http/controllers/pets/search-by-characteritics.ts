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
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    energyLevel: z.enum(['CALM', 'PEACEFUL', 'FUSSY']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['TIGHT', 'NORMAL', 'WIDE']).optional(),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)
  const { age, energyLevel, environment, independenceLevel, size } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetService = makeSearchPetsByCharacteristicsService()

  const { pets } = await searchPetService.execute({
    city,
    age: age ?? null,
    energyLevel: energyLevel ?? null,
    environment: environment ?? null,
    independenceLevel: independenceLevel ?? null,
    size: size ?? null,
  })

  return reply.status(200).send({ pets })
}
