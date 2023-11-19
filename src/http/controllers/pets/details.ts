import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetSpecificPetDetailsService } from '@/services/factories/make-get-specific-pet-details-service'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsService = makeGetSpecificPetDetailsService()

  const { pet } = await getPetDetailsService.execute({
    petId: id,
  })

  return reply.status(200).send({ pet })
}
