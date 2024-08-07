import {
  Age,
  EnergyLevel,
  Size,
  IndependenceLevel,
  Environment,
  Org,
  Pet,
  Prisma,
} from '@prisma/client'

export interface PetQuery {
  city: string
  age: Age | null
  size: Size | null
  energyLevel: EnergyLevel | null
  independenceLevel: IndependenceLevel | null
  environment: Environment | null
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findAll(page: number): Promise<Pet[]>
  findManyOrgs(orgs: Org[], page: number): Promise<Pet[]>
  findManyByQuery(query: PetQuery, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<void>
  save(data: Prisma.PetUncheckedCreateInput): Promise<void>
  delete(id: string): Promise<void>
}
