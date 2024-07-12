import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'
import { InvalidCEPError } from '@/services/errors/invalid-cep-error'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { NotAllowedError } from '@/services/errors/not-allowed-error'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: 'Not found.' })
  }

  if (error instanceof NotAllowedError) {
    return reply.status(405).send({ message: 'Not allowed.' })
  }

  if (error instanceof OrgAlreadyExistsError) {
    return reply.status(409).send({ message: 'Email already exists.' })
  }

  if (error instanceof InvalidCEPError) {
    return reply.status(404).send({ message: 'Invalid CEP.' })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({ message: 'Invalid email or password.' })
  }

  reply.log.error(
    {
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      },
      error,
    },
    'Unhandled error occurred.',
  )

  return reply.code(500).send(error.message)
}
