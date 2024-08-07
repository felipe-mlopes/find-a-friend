import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsByIdService } from './get-pet-details-by-id.service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsByIdService

describe('Get Pet Details By Id Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsByIdService(petsRepository)
  })

  it('should be able to get pet details by id', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'Paçoca',
      description: 'Cachorro muito sapeca.',
      age: 'ADULT',
      energy_level: 'FUSSY',
      environment: 'NORMAL',
      independence_level: 'MEDIUM',
      size: 'MEDIUM',
      images: [''],
      requirement: [''],
      org_id: 'org-id',
      created_at: new Date(),
      updated_at: null,
    })

    const specificPet = petsRepository.items[0]

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
