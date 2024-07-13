import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeEditPetService } from '@/services/factories/make-edit-pet.service'

export async function editPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const editPetBodySchema = z.object({
    data: z.object({
      name: z.string().min(3).optional(),
      description: z.string().optional(),
      age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
      independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      energy_level: z.enum(['CALM', 'PEACEFUL', 'FUSSY']).optional(),
      environment: z.enum(['TIGHT', 'NORMAL', 'WIDE']).optional(),
    }),
  })

  const orgId = request.user.sub

  const { id } = editPetParamsSchema.parse(request.params)
  const { data } = editPetBodySchema.parse(request.body)

  const editPetService = makeEditPetService()

  const { message } = await editPetService.execute({
    id,
    data,
    orgId,
  })

  return reply.status(200).send({ message })
}
