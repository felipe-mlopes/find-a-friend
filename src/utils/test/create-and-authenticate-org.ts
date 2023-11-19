import { FastifyInstance } from 'fastify'
import { hash } from 'bcrypt'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Adota Pet',
      admin_name: 'Fulano',
      email: 'fulano@example.com',
      password_hash: await hash('123456', 6),
      cep: '21220000',
      address: 'Rua teste',
      city: 'Rio de Janeiro',
      whatsapp: '21987654321',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'fulano@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
