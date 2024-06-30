import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchAllPetsService } from '../fetch-all-pets.service'

export function makeFetchAllPetsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new FetchAllPetsService(petsRepository)

  return service
}
