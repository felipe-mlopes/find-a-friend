import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrgService } from '../../../services/factories/make-create-org-service'
import { OrgAlreadyExistsError } from '../../../services/errors/org-already-exists-error'
import { InvalidCEPError } from '../../../services/errors/invalid-cep-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
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

  try {
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
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof InvalidCEPError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
