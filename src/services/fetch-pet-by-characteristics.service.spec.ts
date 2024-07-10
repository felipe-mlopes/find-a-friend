import { randomUUID } from 'node:crypto'
import { describe, beforeEach, it, expect } from 'vitest'

import { FetchPetsByCharacteristicsService } from './fetch-pet-by-characteristics.service'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByCharacteristicsService

describe('Fetch Pets By Characteristics Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByCharacteristicsService(petsRepository, orgsRepository)
  })

  it('should be able to fecth pets by one characteristic', async () => {
    const city = 'Rio de Janeiro'

    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city,
      whatsapp: '21912345678',
      created_at: new Date(),
    })

    const org = orgsRepository.items[0]

    await petsRepository.create({
      id: randomUUID(),
      name: 'Paçoca',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'NORMAL',
      images: [''],
      requirement: [''],
      created_at: new Date(),
      updated_at: null,
      org_id: org.id,
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'Will',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'TIGHT',
      images: [''],
      requirement: [''],
      created_at: new Date(),
      updated_at: null,
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      query: {
        city,
        age: 'ADULT',
        energyLevel: null,
        environment: null,
        independenceLevel: null,
        size: null,
      },
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ age: 'ADULT' }),
      expect.objectContaining({ age: 'ADULT' }),
    ])
  })

  it('should be able to fetch pets by all characteristics', async () => {
    const city = 'Rio de Janeiro'

    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city,
      whatsapp: '21912345678',
      created_at: new Date(),
    })

    const org = orgsRepository.items[0]

    await petsRepository.create({
      id: randomUUID(),
      name: 'Paçoca',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'NORMAL',
      images: [''],
      requirement: [''],
      created_at: new Date(),
      updated_at: null,
      org_id: org.id,
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'Will',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'TIGHT',
      images: [''],
      requirement: [''],
      created_at: new Date(),
      updated_at: null,
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      query: {
        city,
        age: 'ADULT',
        energyLevel: 'FUSSY',
        environment: 'TIGHT',
        independenceLevel: 'MEDIUM',
        size: 'MEDIUM',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ energy_level: 'FUSSY' })])
  })

  it('should not be able to fetch for pets in the non-existent city', async () => {
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

    await petsRepository.create({
      id: randomUUID(),
      name: 'Paçoca',
      description: 'Cachorro sapeca que gosta de brincar.',
      age: 'ADULT',
      size: 'MEDIUM',
      energy_level: 'FUSSY',
      independence_level: 'MEDIUM',
      environment: 'NORMAL',
      images: [''],
      requirement: [''],
      created_at: new Date(),
      updated_at: null,
      org_id: org.id,
    })

    await expect(() =>
      sut.execute({
        query: {
          city: 'Niterói',
          size: 'SMALL',
          age: null,
          energyLevel: null,
          environment: null,
          independenceLevel: null,
        },
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to fetch paginated pets by characteristics', async () => {
    const city = 'Rio de Janeiro'

    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city,
      whatsapp: '21912345678',
      created_at: new Date(),
    })

    const org = orgsRepository.items[0]

    for (let i = 1; i <= 11; i++) {
      await petsRepository.create({
        id: randomUUID(),
        name: `Paçoca ${i}`,
        description: 'Cachorro sapeca que gosta de brincar.',
        age: 'ADULT',
        size: 'MEDIUM',
        energy_level: 'FUSSY',
        independence_level: 'MEDIUM',
        environment: 'NORMAL',
        images: [''],
        requirement: [''],
        created_at: new Date(),
        updated_at: null,
        org_id: org.id,
      })
    }

    const { pets } = await sut.execute({
      query: {
        city,
        age: 'ADULT',
        size: 'MEDIUM',
        energyLevel: 'FUSSY',
        independenceLevel: 'MEDIUM',
        environment: 'NORMAL',
      },
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Paçoca 10' }),
      expect.objectContaining({ name: 'Paçoca 11' }),
    ])
  })
})
