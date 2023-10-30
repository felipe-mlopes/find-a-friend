import { Org } from '@prisma/client'
import { hash } from 'bcrypt'

import { OrgsRepository } from '../repositories/orgs-repositories'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterOrgServiceRequest {
  name: string
  adminName: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: number
}

interface RegisterOrgServiceResponse {
  org: Org
}

export class RegisterOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    adminName,
    email,
    password,
    cep,
    address,
    whatsapp,
  }: RegisterOrgServiceRequest): Promise<RegisterOrgServiceResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new InvalidCredentialsError()
    }

    const org = await this.orgsRepository.create({
      name,
      admin_name: adminName,
      email,
      password_hash,
      cep,
      address,
      whatsapp,
    })

    return {
      org,
    }
  }
}
