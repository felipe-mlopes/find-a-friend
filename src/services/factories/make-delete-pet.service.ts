import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { DeletePetRecordService } from '../delete-pet-record.service'

export function makeDeletePetService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new DeletePetRecordService(petsRepository)

  return service
}
