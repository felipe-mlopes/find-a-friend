import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrgService } from '@/services/factories/make-create-org-service'

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodySchema = z.object({
    name: z.string().min(4),
    adminName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z
      .string()
      .refine((cep) => cep.length === 8, {
        message: 'O CEP deve conter exatamente 8 dígitos',
      })
      .refine((cep) => /^\d+$/.test(cep), {
        message: 'O CEP não pode conter letras',
      })
      .refine((cep) => !/\s/.test(cep), {
        message: 'O CEP não pode conter espaços em branco',
      }),
    address: z.string(),
    whatsapp: z.string(),
  })

  const { name, adminName, email, cep, address, password, whatsapp } =
    createBodySchema.parse(request.body)

  const createOrgService = makeCreateOrgService()

  await createOrgService.execute({
    name,
    adminName,
    email,
    cep,
    address,
    password,
    whatsapp,
  })

  return reply.status(201).send({ message: 'Register was successful.' })
}
