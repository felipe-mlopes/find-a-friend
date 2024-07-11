import { $Enums } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repositories'
import { OrgsRepository } from '@/repositories/orgs-repositories'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetServiceRequest {
  name: string
  description: string
  age: $Enums.Age
  size: $Enums.Size
  independence_level: $Enums.IndependenceLevel
  energy_level: $Enums.EnergyLevel
  environment: $Enums.Environment
  images: string[]
  requirement: string[]
  orgId: string
}

interface RegisterPetServiceResponse {
  message: string
}

export class RegisterPetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    independence_level,
    energy_level,
    environment,
    images,
    requirement,
    orgId,
  }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    await this.petsRepository.create({
      name,
      description,
      age,
      size,
      independence_level,
      energy_level,
      environment,
      images,
      requirement,
      org_id: orgId,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return {
      message: 'Pet was created successfully.',
    }
  }
}
