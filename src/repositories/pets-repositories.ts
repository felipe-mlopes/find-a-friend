import { Org, Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyOrgs(orgs: Org[]): Promise<Pet[]>
  findManyByQuery(
    city: string,
    age: string | null,
    size: string | null,
    energyLevel: string | null,
    independenceLevel: string | null,
    environment: string | null,
  ): Promise<Pet[]>
}
