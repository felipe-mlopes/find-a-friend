import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetDetailsByIdService } from '@/services/factories/make-get-pet-details-by-id.service'

export async function getPetDetailsByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetDetailsByIdParamsSchema.parse(request.params)

  const getPetDetailsByIdService = makeGetPetDetailsByIdService()

  const { pet } = await getPetDetailsByIdService.execute({
    petId: id,
  })

  return reply.status(200).send({ pet })
}
