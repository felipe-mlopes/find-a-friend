import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcrypt'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgService } from './create-org.service'
import { InvalidCEPError } from './errors/invalid-cep-error'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgService

describe('Create Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('should be able to create an org', async () => {
    await sut.execute({
      name: 'Org',
      adminName: 'John Doe',
      email: 'org@example.com',
      password: '123456',
      cep: '21220000',
      address: 'Example St',
      whatsapp: '21912345678',
    })

    const org = orgsRepository.items[0]

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    await sut.execute({
      name: 'Org',
      adminName: 'John Doe',
      email: 'org@example.com',
      password: '123456',
      cep: '21220000',
      address: 'Example St',
      whatsapp: '21912345678',
    })

    const org = orgsRepository.items[0]

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'org@example.com'

    await sut.execute({
      name: 'Org',
      adminName: 'John Doe',
      email,
      password: '123456',
      cep: '21220000',
      address: 'Example St',
      whatsapp: '21912345678',
    })

    await expect(() =>
      sut.execute({
        name: 'Org',
        adminName: 'John Doe',
        email,
        password: '123456',
        cep: '221234',
        address: 'Example St',
        whatsapp: '21912345678',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should not be able to register with invalid CEP', async () => {
    await expect(() =>
      sut.execute({
        name: 'Org',
        adminName: 'John Doe',
        email: 'org@example.com',
        password: '123456',
        cep: '21220123',
        address: 'Example St',
        whatsapp: '21912345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCEPError)
  })
})
