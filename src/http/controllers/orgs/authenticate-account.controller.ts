import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticateAccountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateService = makeAuthenticateService()

  const { org } = await authenticateService.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      access_token: token,
    })
}
