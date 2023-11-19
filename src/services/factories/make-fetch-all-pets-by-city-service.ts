import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchAllPetsByCityService } from '../fetch-all-pets-by-city'

export function makeFetchAllPetsByCityService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const service = new FetchAllPetsByCityService(petsRepository, orgsRepository)

  return service
}
