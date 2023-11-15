import { describe, beforeEach, it, expect } from 'vitest'

import { PetsRepository } from '../repositories/pets-repositories'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrgsRepository } from '../repositories/orgs-repositories'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { FetchAllPetsByCityService } from './fetch-all-pets-by-city'

let petsRepository: PetsRepository
let orgsRepository: OrgsRepository
let sut: FetchAllPetsByCityService

describe('Fetch Pet By City Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchAllPetsByCityService(petsRepository, orgsRepository)
  })

  it('should be to able fetch all pets by city', async () => {
    const city = 'Rio de Janeiro'

    const org = await orgsRepository.create({
      id: 'org-01',
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      cep: '21220000',
      city,
      address: 'Example St',
      whatsapp: '21912345678',
    })

    await petsRepository.create({
      name: 'Paçoca',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'NORMAL',
      images: [''],
      requirement: '',
      updated_at: new Date(),
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Will',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'TIGHT',
      images: [''],
      requirement: '',
      updated_at: new Date(),
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city,
    })

    expect(pets).toHaveLength(2)
  })
})
