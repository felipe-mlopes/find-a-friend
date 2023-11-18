import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeGetSpecificPetDetailsService } from '../../../services/factories/make-get-specific-pet-details-service'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsService = MakeGetSpecificPetDetailsService()

  const { pet } = await getPetDetailsService.execute({
    petId,
  })

  return reply.status(200).send({ pet })
}
