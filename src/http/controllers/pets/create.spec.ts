import { afterAll, beforeAll, describe, expect, it } from 'vitest'
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

  it('should be able to create a pet registry', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const { sub } = app.jwt.decode(token) as TokenProps

    const response = await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Paçoca',
        description: '',
        age: 'PUPPY',
        energyLevel: 'FUSSY',
        size: 'MEDIUM',
        independenceLevel: 'MEDIUM',
        environment: 'NORMAL',
        images: [''],
        requirement: [''],
        orgId: sub,
      })

    expect(response.statusCode).toEqual(201)
  })
})
