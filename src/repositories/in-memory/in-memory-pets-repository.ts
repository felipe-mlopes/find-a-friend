import { Org, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetQuery, PetsRepository } from '../pets-repositories'

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
      requirement: [],
      created_at: new Date(),
      updated_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async findManyOrgs(orgs: Org[]) {
    const orgsIdArray = orgs.map((org) => org.id)

    return this.items.filter((item) => orgsIdArray.includes(item.org_id))
  }

  async findManyByQuery({
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
  }: PetQuery) {
    let petsFiltered = this.items

    if (age) {
      petsFiltered = this.items.filter((item) => item.age === age)
    }

    if (size) {
      petsFiltered = this.items.filter((item) => item.size === size)
    }

    if (energyLevel) {
      petsFiltered = this.items.filter(
        (item) => item.energy_level === energyLevel,
      )
    }

    if (independenceLevel) {
      petsFiltered = this.items.filter(
        (item) => item.independence_level === independenceLevel,
      )
    }

    if (environment) {
      petsFiltered = this.items.filter(
        (item) => item.environment === environment,
      )
    }

    return petsFiltered
  }
}
