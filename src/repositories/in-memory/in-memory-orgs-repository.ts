import { randomUUID } from 'node:crypto'
import { $Enums } from '@prisma/client'

import { OrgsRepository } from '../orgs-repositories'

interface Org {
  id: string
  name: string
  admin_name: string
  email: string
  password_hash: string
  role: $Enums.Role
  cep: string
  address: string
  city: string
  whatsapp: string
  created_at: Date
}

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) return null

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) return null

    return org
  }

  async findByEmailOrName(email: string, name: string) {
    const org = this.items.find(
      (item) => item.email === email || item.name === name,
    )

    if (!org) return null

    return org
  }

  async findByCity(city: string) {
    return this.items.filter(
      (item) => item.city.toLocaleLowerCase() === city.toLocaleLowerCase(),
    )
  }

  async create(data: Org) {
    const org = {
      id: randomUUID(),
      name: data.name,
      admin_name: data.admin_name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'ADMIN',
      cep: data.cep,
      city: data.city,
      address: data.address,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    }

    this.items.push(org)
  }
}
