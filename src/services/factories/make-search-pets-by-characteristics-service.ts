import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByCharacteristicsService } from '../search-pets-by-characteristics'

export function makeSearchPetsByCharacteristicsService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const service = new SearchPetsByCharacteristicsService(
    petsRepository,
    orgsRepository,
  )

  return service
}
