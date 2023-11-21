import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchAllPetsByCityService } from '@/services/factories/make-fetch-all-pets-by-city-service'

export async function searchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAllPetsByCityQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = fetchAllPetsByCityQuerySchema.parse(request.query)

  const fecthByCityService = makeFetchAllPetsByCityService()

  const { pets } = await fecthByCityService.execute({
    query: city,
    page,
  })

  return reply.status(200).send({ pets })
}
