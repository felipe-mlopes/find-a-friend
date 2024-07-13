import { PetsRepository } from '@/repositories/pets-repositories'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeletePetRecordServiceRequest {
  id: string
  orgId: string
}

export class DeletePetRecordService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id, orgId }: DeletePetRecordServiceRequest): Promise<void> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    if (pet.org_id !== orgId) {
      throw new NotAllowedError()
    }

    await this.petsRepository.delete(pet.id)
  }
}
