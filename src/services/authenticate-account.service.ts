import { compare } from 'bcrypt'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repositories'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateAccountServiceRequest {
  email: string
  password: string
}

interface AuthenticateAccountServiceResponse {
  org: Org
}

export class AuthenticateAccountService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAccountServiceRequest): Promise<AuthenticateAccountServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
