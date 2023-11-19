import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgService } from '../register-org'

export function makeCreateOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new RegisterOrgService(orgsRepository)

  return service
}
