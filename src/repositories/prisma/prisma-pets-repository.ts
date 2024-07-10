import {
  Org,
  Prisma,
  Age,
  Size,
  EnergyLevel,
  IndependenceLevel,
  Environment,
} from '@prisma/client'

import { PetQuery, PetsRepository } from '../pets-repositories'
import { prisma } from '@/lib/prisma'

interface SearchPetProps {
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
  environment?: Environment
}

export class PrismaPetsRepository implements PetsRepository {
  async findAll(page: number) {
    const pets = await prisma.pet.findMany({
      take: 9,
      skip: (page - 1) * 9,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyOrgs(orgs: Org[], page: number) {
    const orgsIdArray = orgs.map((org) => org.id)

    const pets = prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsIdArray,
        },
      },
      take: 9,
      skip: (page - 1) * 9,
    })

    return pets
  }

  async findManyByQuery(
    { city, age, size, energyLevel, independenceLevel, environment }: PetQuery,
    page: number,
  ) {
    const query: SearchPetProps = {}

    if (age !== null) query.age = age

    if (size !== null) query.size = size

    if (energyLevel !== null) query.energyLevel = energyLevel

    if (independenceLevel !== null) query.independenceLevel = independenceLevel

    if (environment !== null) query.environment = environment

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...query,
      },
      take: 9,
      skip: (page - 1) * 9,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    await prisma.pet.create({
      data,
    })
  }

  async save(data: Prisma.PetUncheckedCreateInput) {
    await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string) {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }
}
