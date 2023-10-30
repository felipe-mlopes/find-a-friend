import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(cep: string): Promise<Pet[] | null>
  findByCharacteristics(
    age?: number,
    size?: string,
    energyLevel?: string,
    independenceLevel?: string,
    environment?: string,
  ): Promise<Pet[] | null>
}
