import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateAccountService } from './authenticate-account.service'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { randomUUID } from 'node:crypto'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateAccountService

describe('Authenticate Account Service', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateAccountService(orgsRepository)

    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city: 'Rio de Janeiro',
      whatsapp: '21912345678',
      created_at: new Date(),
    })
  })

  it('should be able to authenticate account', async () => {
    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate account with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate account with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
