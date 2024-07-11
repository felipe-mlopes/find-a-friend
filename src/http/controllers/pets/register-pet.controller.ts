import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterPetService } from '@/services/factories/make-register-pet.service'

export async function registerPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string().min(3),
    description: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    energy_level: z.enum(['CALM', 'PEACEFUL', 'FUSSY']),
    environment: z.enum(['TIGHT', 'NORMAL', 'WIDE']),
    images: z.string().array(),
    requirement: z.string().array(),
  })

  const orgId = request.user.sub

  const {
    name,
    description,
    age,
    size,
    independence_level,
    energy_level,
    environment,
    images,
    requirement,
  } = registerPetBodySchema.parse(request.body)

  const registerPetService = makeRegisterPetService()

  const message = await registerPetService.execute({
    name,
    description,
    age,
    size,
    independence_level,
    energy_level,
    environment,
    images,
    requirement,
    orgId,
  })

  return reply.status(201).send({ message })
}
