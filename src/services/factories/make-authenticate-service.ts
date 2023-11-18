import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { AuthenticateService } from '../authenticate'

export function MakeAuthenticateService() {
  const orgsRepository = new PrismaOrgsRepository()
  const service = new AuthenticateService(orgsRepository)

  return service
}
