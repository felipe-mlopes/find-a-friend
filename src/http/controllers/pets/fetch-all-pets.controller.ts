import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchAllPetsService } from '@/services/factories/make-fetch-all-pets-by-city-service'

export async function fetchAllPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAllPetsByCityQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchAllPetsByCityQuerySchema.parse(request.query)

  const fecthByCityService = makeFetchAllPetsService()

  const { pets } = await fecthByCityService.execute({
    page,
  })

  return reply.status(200).send({ pets })
}
