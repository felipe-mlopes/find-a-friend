import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsByIdServiceRequest {
  petId: string
}

interface GetPetDetailsByIdServiceResponse {
  pet: Pet
}

export class GetPetDetailsByIdService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsByIdServiceRequest): Promise<GetPetDetailsByIdServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
