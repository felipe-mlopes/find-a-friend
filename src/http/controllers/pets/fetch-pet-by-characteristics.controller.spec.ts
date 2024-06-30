import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { TokenProps } from '@/@types/test/token'

describe('Fetch Pets by Characteristics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by characteristics', async () => {
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
        age: 'ADULT',
        energyLevel: 'PEACEFUL',
        size: 'SMALL',
        independenceLevel: 'HIGH',
        environment: 'WIDE',
        images: [''],
        requirement: [''],
        orgId: sub,
      })

    const city = 'Rio de Janeiro'

    const response = await request(app.server)
      .get(`/pets/search/${city}`)
      .query({
        age: 'ADULT',
      })
      .send({
        city,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0]).toEqual(
      expect.objectContaining({
        name: 'Pitoco',
      }),
    )
  })
})
