import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { SearchPetsByCharacteristicsService } from './search-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsByCharacteristicsService

describe('Seach Pets By Characteristics Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetsByCharacteristicsService(petsRepository, orgsRepository)
  })

  it('should be to able search pets by one characteristic', async () => {
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
      age: 'ADULT',
      energyLevel: null,
      environment: null,
      independenceLevel: null,
      size: null,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ age: 'ADULT' }),
      expect.objectContaining({ age: 'ADULT' }),
    ])
  })

  it('should be to able search pets by all characteristics', async () => {
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
      age: 'ADULT',
      energyLevel: 'FUSSY',
      environment: 'TIGHT',
      independenceLevel: 'MEDIUM',
      size: 'MEDIUM',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ energy_level: 'FUSSY' })])
  })
})
