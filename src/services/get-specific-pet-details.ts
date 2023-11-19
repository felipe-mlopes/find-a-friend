import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSpecificPetDetailsServiceRequest {
  petId: string
}

interface GetSpecificPetDetailsServiceResponse {
  pet: Pet
}

export class GetSpecificPetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetSpecificPetDetailsServiceRequest): Promise<GetSpecificPetDetailsServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
