import { describe, beforeEach, it, expect } from 'vitest'
import { randomUUID } from 'crypto'

import { RegisterPetService } from './register-pet.service'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetService

describe('Pet Register Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetService(petsRepository, orgsRepository)
  })

  it('should be to able register a pet', async () => {
    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city: 'Rio de Janeiro',
      whatsapp: '21912345678',
      created_at: new Date(),
    })

    const org = orgsRepository.items[0]

    await sut.execute({
      name: 'Paçoca',
      description: 'bla bla',
      age: 'PUPPY',
      size: 'MEDIUM',
      independence_level: 'MEDIUM',
      energy_level: 'FUSSY',
      environment: 'NORMAL',
      images: [''],
      requirement: [''],
      orgId: org.id,
    })

    const pet = petsRepository.items[0]

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be to able register a pet without a registered org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Paçoca',
        description: 'bla bla',
        age: 'PUPPY',
        size: 'MEDIUM',
        independence_level: 'MEDIUM',
        energy_level: 'FUSSY',
        environment: 'NORMAL',
        images: [''],
        requirement: [''],
        orgId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
