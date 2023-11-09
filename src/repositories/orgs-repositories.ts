import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findByEmailOrName(email: string, name: string): Promise<Org | null>
  findByCity(city: string): Promise<Org[]>
}
