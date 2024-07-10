import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repositories'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditPetRecordServiceRequest {
  id: string
  data: Partial<Omit<Pet, 'id' | 'org_id' | 'created_at' | 'updated_at'>>
  orgId: string
}

interface EditPetRecordServiceResponse {
  message: string
}

export class EditPetRecordService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    data,
    orgId,
  }: EditPetRecordServiceRequest): Promise<EditPetRecordServiceResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    if (pet.org_id !== orgId) {
      throw new NotAllowedError()
    }

    pet.name = data.name ?? pet.name
    pet.description = data.description ?? pet.description
    pet.age = data.age ?? pet.age
    pet.size = data.size ?? pet.size
    pet.energy_level = data.energy_level ?? pet.energy_level
    pet.independence_level = data.independence_level ?? pet.independence_level
    pet.environment = data.environment ?? pet.environment
    pet.updated_at = new Date()

    await this.petsRepository.save(pet)

    return {
      message: "The pet's record was successfully updated.",
    }
  }
}
