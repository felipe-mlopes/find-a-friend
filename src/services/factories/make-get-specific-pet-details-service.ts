import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetSpecificPetDetailsService } from '../get-specific-pet-details'

export function makeGetSpecificPetDetailsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new GetSpecificPetDetailsService(petsRepository)

  return service
}
