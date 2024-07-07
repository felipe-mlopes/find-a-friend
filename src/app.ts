import fastify, { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from '@/env'

import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import { errorHandler } from './http/controllers/errors'

export const app: FastifyInstance = fastify({})

// Swagger Documentation
app.register(import('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API | Find a Friend',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        AccessToken: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
})
app.register(import('@fastify/swagger-ui'), {
  routePrefix: 'api-docs',
})

// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Cookies
app.register(fastifyCookie)

// Routes
app.register(orgsRoutes)
app.register(petsRoutes)

// Error handling
app.setErrorHandler(errorHandler)
