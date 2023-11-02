import { describe, beforeEach, it, expect } from 'vitest'

import { PetsRepository } from '../repositories/pets-repositories'
import { RegisterPetService } from './register-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrgsRepository } from '../repositories/orgs-repositories'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'

let petsRepository: PetsRepository
let orgsRepository: OrgsRepository
let sut: RegisterPetService

describe('Pet Register Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetService(petsRepository, orgsRepository)
  })

  it('should be to able register a pet', async () => {
    const { id } = await orgsRepository.create({
      id: 'org-01',
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      cep: '21220000',
      city: 'Rio de Janeiro',
      address: 'Example St',
      whatsapp: 21999999,
    })

    const { pet } = await sut.execute({
      name: 'Paçoca',
      description: 'bla bla',
      age: 3,
      energyLevel: '',
      environment: '',
      images: [''],
      independenceLevel: '',
      requirement: '',
      size: '',
      orgId: id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
