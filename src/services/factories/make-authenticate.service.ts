import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateAccountService } from '../authenticate-account.service'

export function makeAuthenticateService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new AuthenticateAccountService(orgsRepository)

  return service
}
