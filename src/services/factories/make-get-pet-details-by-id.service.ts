import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsByIdService } from '../get-pet-details-by-id.service'

export function makeGetPetDetailsByIdService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new GetPetDetailsByIdService(petsRepository)

  return service
}
