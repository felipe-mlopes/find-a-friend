import { Org } from '@prisma/client'
import { hash } from 'bcrypt'

import { OrgsRepository } from '@/repositories/orgs-repositories'
import { searchCityToCep } from '@/utils/search-city-to-cep'
import { InvalidCEPError } from './errors/invalid-cep-error'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgServiceRequest {
  name: string
  adminName: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: string
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
      throw new OrgAlreadyExistsError()
    }

    const city = await searchCityToCep(cep)

    if (!city) {
      throw new InvalidCEPError()
    }

    const org = await this.orgsRepository.create({
      name,
      admin_name: adminName,
      email,
      password_hash,
      cep,
      address,
      city,
      whatsapp,
    })

    return {
      org,
    }
  }
}
