import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Size,
} from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repositories'
import { OrgsRepository } from '../repositories/orgs-repositories'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ResgisterPetServiceRequest {
  name: string
  description: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  images: string[]
  requirement: string[]
  orgId: string
}

interface ResgisterPetServiceResponse {
  pet: Pet
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
    energyLevel,
    independenceLevel,
    environment,
    images,
    requirement,
    orgId,
  }: ResgisterPetServiceRequest): Promise<ResgisterPetServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
      images,
      requirement,
      org_id: orgId,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return {
      pet,
    }
  }
}
