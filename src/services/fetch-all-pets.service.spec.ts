import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchAllPetsService } from './fetch-all-pets.service'
import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let sut: FetchAllPetsService

describe('Fetch Pet By City Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAllPetsService(petsRepository)
  })

  it('should be to able fetch all pets', async () => {
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
      org_id: 'adafwf4sf12sf1s4fswasf',
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
      org_id: 'adafwf4sf12sf1s4fswasf',
    })

    const { pets } = await sut.execute({
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch paginated pets search', async () => {
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
        org_id: 'adafwf4sf12sf1s4fswasf',
      })
    }

    const { pets } = await sut.execute({
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Paçoca 10' }),
      expect.objectContaining({ name: 'Paçoca 11' }),
    ])
  })
})
