import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { EditPetRecordService } from '../edit-pet-record.service'

export function makeEditPetService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new EditPetRecordService(petsRepository)

  return service
}
