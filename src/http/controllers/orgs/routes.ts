import { FastifyInstance } from 'fastify'

import { createOrgController } from './create-org.controller'
import { authenticateAccountController } from './authenticate-account.controller'
import { refreshTokenController } from './refresh-token.controller'

import {
  orgAuthSchema,
  orgRefreshTokenSchema,
  orgRegistrationSchema,
} from '@/docs/swagger'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/register', { schema: orgRegistrationSchema }, createOrgController)
  app.post('/session', { schema: orgAuthSchema }, authenticateAccountController)

  app.patch(
    '/token/refresh',
    { schema: orgRefreshTokenSchema },
    refreshTokenController,
  )
}
