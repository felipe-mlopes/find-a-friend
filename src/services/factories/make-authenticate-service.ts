import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateAccoutnService } from '../authenticate-account.service'

export function makeAuthenticateService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new AuthenticateAccoutnService(orgsRepository)

  return service
}
