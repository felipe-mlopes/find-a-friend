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

  it('should be able to generate a refresh token', async () => {
    await request(app.server).post('/register').send({
      name: 'Org Adota Pet',
      adminName: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
      cep: '21220000',
      address: 'Rua teste',
      whatsapp: '21987654321',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'fulano@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
