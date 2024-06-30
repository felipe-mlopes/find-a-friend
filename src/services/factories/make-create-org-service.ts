import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgService } from '../create-org.service'

export function makeCreateOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new CreateOrgService(orgsRepository)

  return service
}
