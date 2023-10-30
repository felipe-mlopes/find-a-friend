import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repositories'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      images: [],
      requirement: data.requirement,
      created_at: new Date(),
      updated_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findByCity(cep: string) {
    return null
  }

  async findByCharacteristics(
    age?: number | undefined,
    size?: string | undefined,
    energyLevel?: string | undefined,
    independenceLevel?: string | undefined,
    environment?: string | undefined,
  ) {
    return null
  }
}
