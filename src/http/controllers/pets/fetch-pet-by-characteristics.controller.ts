import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchPetsByCharacteristicsService } from '@/services/factories/make-fetch-pets-by-characteristics.service'

export async function fetchPetsByCharacteristicsController(
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
    page: z.coerce.number().min(1).default(1),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)
  const { age, energyLevel, environment, independenceLevel, size, page } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetService = makeFetchPetsByCharacteristicsService()

  const { pets } = await searchPetService.execute({
    query: {
      city,
      age: age ?? null,
      energyLevel: energyLevel ?? null,
      environment: environment ?? null,
      independenceLevel: independenceLevel ?? null,
      size: size ?? null,
    },
    page,
  })

  return reply.status(200).send({ pets })
}
