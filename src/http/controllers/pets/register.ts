import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetService } from '../../../services/factories/make-register-pet-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    energyLevel: z.enum(['CALM', 'PEACEFUL', 'FUSSY']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['TIGHT', 'NORMAL', 'WIDE']),
    images: z.string().array(),
    requirement: z.string().array(),
  })

  const { orgId } = registerPetParamsSchema.parse(request.user)

  const {
    name,
    description,
    age,
    energyLevel,
    size,
    independenceLevel,
    environment,
    images,
    requirement,
  } = registerPetBodySchema.parse(request.body)

  const registerPetService = makeRegisterPetService()

  await registerPetService.execute({
    orgId,
    name,
    description,
    age,
    energyLevel,
    size,
    independenceLevel,
    environment,
    images,
    requirement,
  })

  return reply.status(201).send()
}
