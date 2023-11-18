import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetSpecificPetDetailsService } from '../get-specific-pet-details'

export function MakeGetSpecificPetDetailsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new GetSpecificPetDetailsService(petsRepository)

  return service
}
