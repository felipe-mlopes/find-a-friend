import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repositories'

interface FetchAllPetsServiceRequest {
  page: number
}

interface FetchAllPetsServiceResponse {
  pets: Pet[]
}

export class FetchAllPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    page,
  }: FetchAllPetsServiceRequest): Promise<FetchAllPetsServiceResponse> {
    const pets = await this.petsRepository.findAll(page)

    return {
      pets,
    }
  }
}
