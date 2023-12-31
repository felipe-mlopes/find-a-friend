import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repositories'
import { OrgsRepository } from '@/repositories/orgs-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchAllPetsByCityServiceRequest {
  query: string
  page: number
}

interface FetchAllPetsByCityServiceResponse {
  pets: Pet[]
}

export class FetchAllPetsByCityService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    query,
    page,
  }: FetchAllPetsByCityServiceRequest): Promise<FetchAllPetsByCityServiceResponse> {
    const orgs = await this.orgsRepository.findByCity(query)

    if (orgs.length === 0) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyOrgs(orgs, page)

    return {
      pets,
    }
  }
}
