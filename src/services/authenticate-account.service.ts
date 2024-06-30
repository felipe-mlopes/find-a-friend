import { compare } from 'bcrypt'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repositories'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateAccoutnServiceRequest {
  email: string
  password: string
}

interface AuthenticateAccoutnServiceResponse {
  org: Org
}

export class AuthenticateAccoutnService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAccoutnServiceRequest): Promise<AuthenticateAccoutnServiceResponse> {
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
