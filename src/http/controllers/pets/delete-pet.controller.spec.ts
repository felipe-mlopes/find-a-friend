import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

interface TokenProps {
  sub: string
  iat: number
  exp: number
}

describe('', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] /pets/pet/:id/delete', async () => {
    const { access_token } = await createAndAuthenticateOrg(app)
    const { sub } = app.jwt.decode(access_token) as TokenProps

    await request(app.server)
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

    const petRecords = await request(app.server).get('/pets').send()

    const { pets } = petRecords.body

    const petId = pets[0].id

    const response = await request(app.server)
      .delete(`/pets/pet/${petId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toEqual(202)
  })
})
