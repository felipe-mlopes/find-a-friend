import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Pet } from '@prisma/client'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { TokenProps } from '@/@types/test/token'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a specific pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { sub } = token as TokenProps

    const newPet = await request(app.server)
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

    const { id } = newPet.body.newPet.pet as Pet

    const response = await request(app.server).get(`/pets/pet/${id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.name).toEqual('Paçoca')
  })
})
