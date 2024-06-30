import { Pet } from '@prisma/client'

import { PetQuery, PetsRepository } from '@/repositories/pets-repositories'
import { OrgsRepository } from '@/repositories/orgs-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsByCharacteristicsServiceRequest {
  query: PetQuery
  page: number
}

interface FetchPetsByCharacteristicsServiceResponse {
  pets: Pet[]
}

export class FetchPetsByCharacteristicsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    query,
    page,
  }: FetchPetsByCharacteristicsServiceRequest): Promise<FetchPetsByCharacteristicsServiceResponse> {
    const orgs = await this.orgsRepository.findByCity(query.city)

    if (orgs.length === 0) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByQuery(query, page)

    return {
      pets,
    }
  }
}
