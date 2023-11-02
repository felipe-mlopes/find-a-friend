import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repositories'
import { prisma } from '../../lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findFirst({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    })

    return org
  }

  async findByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return orgs
  }
}
