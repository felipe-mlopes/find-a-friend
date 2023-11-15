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
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyOrgs(orgs: Org[]): Promise<Pet[]>
  findManyByQuery(query: PetQuery): Promise<Pet[]>
}
