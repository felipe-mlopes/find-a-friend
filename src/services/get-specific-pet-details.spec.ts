import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetSpecificPetDetailsService } from './get-specific-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetSpecificPetDetailsService

describe('Get Specific Pet Details Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetSpecificPetDetailsService(petsRepository)
  })

  it('should be able to get specific pet details', async () => {
    const specificPet = await petsRepository.create({
      id: 'pet-01',
      name: 'Paçoca',
      description: 'Cachorro muito sapeca.',
      age: 'ADULT',
      energy_level: 'FUSSY',
      environment: 'NORMAL',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      images: [''],
      requirement: '',
      org_id: 'org-id',
      updated_at: new Date(),
    })

    const { pet } = await sut.execute({
      petId: specificPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get a pet inexistent', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
