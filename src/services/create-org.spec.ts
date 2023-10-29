import { beforeEach, describe, expect, it } from 'vitest'
import { OrgsRepository } from '../repositories/orgs-repositories'
import { CreateOrgService } from './create-org'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: OrgsRepository
let sut: CreateOrgService

describe('Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
      name: 'Org I',
      adminName: 'John Doe',
      email: 'orgi@example.com',
      password: '123456',
      cep: '221234',
      address: 'Example St',
      whatsapp: 21999999,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
