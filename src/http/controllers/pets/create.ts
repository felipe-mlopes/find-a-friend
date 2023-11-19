import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
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

  const orgId = request.user.sub

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
  } = createPetBodySchema.parse(request.body)

  const createPetService = makeCreatePetService()

  const newPet = await createPetService.execute({
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

  return reply.status(201).send({ newPet })
}
