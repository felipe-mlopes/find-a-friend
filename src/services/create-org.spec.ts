import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcrypt'

import { OrgsRepository } from '../repositories/orgs-repositories'
import { CreateOrgService } from './create-org'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InvalidCEPError } from './errors/invalid-cep-error'

let orgsRepository: OrgsRepository
let sut: CreateOrgService

describe('Org Register Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
      name: 'Org',
      adminName: 'John Doe',
      email: 'org@example.com',
      password: '123456',
      cep: '21220000',
      address: 'Example St',
      whatsapp: 21999999,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Org',
      adminName: 'John Doe',
      email: 'org@example.com',
      password: '123456',
      cep: '21220000',
      address: 'Example St',
      whatsapp: 21999999,
    })

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
      whatsapp: 21999999,
    })

    await expect(() =>
      sut.execute({
        name: 'Org',
        adminName: 'John Doe',
        email,
        password: '123456',
        cep: '221234',
        address: 'Example St',
        whatsapp: 21999999,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
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
        whatsapp: 21999999,
      }),
    ).rejects.toBeInstanceOf(InvalidCEPError)
  })
})
