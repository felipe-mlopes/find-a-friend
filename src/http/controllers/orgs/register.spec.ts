import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    const response = await request(app.server).post('/register').send({
      name: 'Org Adota Pet',
      adminName: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
      cep: '21220000',
      address: 'Rua teste',
      whatsapp: '21987654321',
    })

    expect(response.statusCode).toEqual(201)
  })
})
