import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { MakeFetchAllPetsByCityService } from '../../../services/factories/make-fetch-all-pets-by-city-service'

export async function searchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAllPetsByCityParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = fetchAllPetsByCityParamsSchema.parse(request.params)

  const fecthByCityService = MakeFetchAllPetsByCityService()

  const { pets } = await fecthByCityService.execute({
    city,
  })

  return reply.status(200).send({ pets })
}
