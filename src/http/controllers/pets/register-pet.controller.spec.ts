import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

interface TokenProps {
  sub: string
  iat: number
  exp: number
}

describe('Create a Pet Registry (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /pets/create', async () => {
    const { access_token } = await createAndAuthenticateOrg(app)

    const { sub } = app.jwt.decode(access_token) as TokenProps

    const response = await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'Paçoca',
        description: '',
        age: 'PUPPY',
        size: 'MEDIUM',
        independence_level: 'MEDIUM',
        energy_level: 'FUSSY',
        environment: 'NORMAL',
        images: [''],
        requirement: [''],
        orgId: sub,
      })

    expect(response.statusCode).toEqual(201)
  })
})
