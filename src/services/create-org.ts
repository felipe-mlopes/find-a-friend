import { Org } from '@prisma/client'
import { hash } from 'bcrypt'

import { OrgsRepository } from '../repositories/orgs-repositories'

interface CreateOrgServiceRequest {
  name: string
  adminName: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: number
}

interface CreateOrgServiceResponse {
  org: Org
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    adminName,
    email,
    password,
    cep,
    address,
    whatsapp,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new Error()
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
