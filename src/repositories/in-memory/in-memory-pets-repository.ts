import { randomUUID } from 'node:crypto'
import { $Enums } from '@prisma/client'

import { PetQuery, PetsRepository } from '../pets-repositories'

interface Pet {
  id: string
  name: string
  description: string
  age: $Enums.Age
  size: $Enums.Size
  energy_level: $Enums.EnergyLevel
  independence_level: $Enums.IndependenceLevel
  environment: $Enums.Environment
  images: string[]
  requirement: string[]
  created_at: Date
  updated_at: Date | null
  org_id: string
}

interface Org {
  id: string
  name: string
  admin_name: string
  email: string
  password_hash: string
  role: $Enums.Role
  cep: string
  address: string
  city: string
  whatsapp: string
  created_at: Date
}

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findAll(page: number) {
    const pets = this.items.slice((page - 1) * 9, page * 9)

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async findManyOrgs(orgs: Org[], page: number) {
    const orgsIdArray = orgs.map((org) => org.id)

    return this.items
      .filter((item) => orgsIdArray.includes(item.org_id))
      .slice((page - 1) * 9, page * 9)
  }

  async findManyByQuery(
    { age, size, energyLevel, independenceLevel, environment }: PetQuery,
    page: number,
  ) {
    let petsFiltered = this.items

    if (age) {
      petsFiltered = this.items
        .filter((item) => item.age === age)
        .slice((page - 1) * 9, page * 9)
    }

    if (size) {
      petsFiltered = this.items
        .filter((item) => item.size === size)
        .slice((page - 1) * 9, page * 9)
    }

    if (energyLevel) {
      petsFiltered = this.items
        .filter((item) => item.energy_level === energyLevel)
        .slice((page - 1) * 9, page * 9)
    }

    if (independenceLevel) {
      petsFiltered = this.items
        .filter((item) => item.independence_level === independenceLevel)
        .slice((page - 1) * 9, page * 9)
    }

    if (environment) {
      petsFiltered = this.items
        .filter((item) => item.environment === environment)
        .slice((page - 1) * 9, page * 9)
    }

    return petsFiltered
  }

  async create(data: Pet) {
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
      updated_at: null,
      org_id: data.org_id,
    }

    this.items.push(pet)
  }

  async save(data: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    this.items[itemIndex] = {
      ...data,
      updated_at: new Date(),
    }
  }

  async delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
