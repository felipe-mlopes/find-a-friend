import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { TokenProps } from '@/@types/test/token'

describe('Search pets by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { sub } = token as TokenProps

    await request(app.server)
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

    await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pitoco',
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

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Rio de Janeiro' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
