import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCharacteristicsService } from '../fetch-pet-by-characteristics.service'

export function makeFetchPetsByCharacteristicsService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const service = new FetchPetsByCharacteristicsService(
    petsRepository,
    orgsRepository,
  )

  return service
}
