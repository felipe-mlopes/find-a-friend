import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeletePetService } from '@/services/factories/make-delete-pet.service'

export async function deletePetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deletePetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const orgId = request.user.sub

  const { id } = deletePetParamsSchema.parse(request.params)

  const deletePetService = makeDeletePetService()

  const { message } = await deletePetService.execute({
    id,
    orgId,
  })

  return reply.status(202).send({ message })
}
