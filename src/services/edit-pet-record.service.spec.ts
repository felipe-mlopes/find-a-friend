import { describe, beforeEach, it, expect } from 'vitest'
import { randomUUID } from 'node:crypto'

import { EditPetRecordService } from './edit-pet-record.service'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: EditPetRecordService

describe('Delete Pet Record Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new EditPetRecordService(petsRepository)
  })

  it('should be to able edit a pet record', async () => {
    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city: 'Rio de Janeiro',
      whatsapp: '21912345678',
      created_at: new Date(),
    })

    const org = orgsRepository.items[0]

    await petsRepository.create({
      id: randomUUID(),
      name: 'Paçoca',
      description: 'bla bla',
      age: 'PUPPY',
      size: 'MEDIUM',
      independence_level: 'MEDIUM',
      energy_level: 'FUSSY',
      environment: 'NORMAL',
      images: [''],
      requirement: [''],
      created_at: new Date(),
      updated_at: null,
      org_id: org.id,
    })

    const pet = petsRepository.items[0]

    const result = await sut.execute({
      id: pet.id,
      data: {
        description: 'He is a kind god.',
        age: 'ADULT',
      },
      orgId: org.id,
    })

    expect(result.message).toEqual(expect.any(String))
  })

  it('should not be to able edit a pet record without it being registered', async () => {
    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city: 'Rio de Janeiro',
      whatsapp: '21912345678',
      created_at: new Date(),
    })

    const org = orgsRepository.items[0]

    await expect(() =>
      sut.execute({
        id: randomUUID(),
        data: {
          description: 'He is a kind god.',
        },
        orgId: org.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be to able edit a pet record by an organization that did not register it', async () => {
    await orgsRepository.create({
      id: randomUUID(),
      name: 'Org',
      admin_name: 'John Doe',
      email: 'org@example.com',
      password_hash: '123456',
      role: 'USER',
      address: 'Example St',
      cep: '21220000',
      city: 'Rio de Janeiro',
      whatsapp: '21912345678',
      created_at: new Date(),
    })
    const org = orgsRepository.items[0]

    await petsRepository.create({
      id: randomUUID(),
      name: 'Paçoca',
      description: 'bla bla',
      age: 'PUPPY',
      size: 'MEDIUM',
      independence_level: 'MEDIUM',
      energy_level: 'FUSSY',
      environment: 'NORMAL',
      images: [''],
      requirement: [''],
      org_id: randomUUID(),
      created_at: new Date(),
      updated_at: null,
    })

    const pet = petsRepository.items[0]

    await expect(() =>
      sut.execute({
        id: pet.id,
        data: {
          description: 'He is a kind god.',
        },
        orgId: org.id,
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
