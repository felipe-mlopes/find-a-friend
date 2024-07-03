export const petsSchema = {
  summary: 'Fetch all available pets',
  response: {
    200: {
      description: 'Pets response',
      type: 'object',
      properties: {
        pets: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              age: { type: 'string' },
              size: { type: 'string' },
              energy_level: { type: 'string' },
              independence_level: { type: 'string' },
              environment: { type: 'string' },
              images: { type: 'array' },
              requirement: { type: 'array' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              org_id: { type: 'string' },
            },
            required: [
              'id',
              'name',
              'description',
              'age',
              'size',
              'energy_level',
              'independence_level',
              'environment',
              'created_at',
              'updated_at',
              'org_id',
            ],
          },
        },
      },
      required: ['pets'],
    },
  },
  tags: ['pets'],
}

export const petsByCharsSchema = {
  summary: 'Fetch available pets by characteristics',
  response: {
    200: {
      description: 'Pets Response',
      type: 'object',
      properties: {
        pets: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              age: { type: 'string' },
              size: { type: 'string' },
              energy_level: { type: 'string' },
              independence_level: { type: 'string' },
              environment: { type: 'string' },
              images: { type: 'array' },
              requirement: { type: 'array' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              org_id: { type: 'string' },
            },
            required: [
              'id',
              'name',
              'description',
              'age',
              'size',
              'energy_level',
              'independence_level',
              'environment',
              'created_at',
              'updated_at',
              'org_id',
            ],
          },
        },
      },
      required: ['pets'],
    },
  },
  tags: ['pets'],
}

export const petDetailsSchema = {
  summary: 'Get a pet details by id',
  response: {
    200: {
      description: 'Pet Details Response',
      type: 'object',
      properties: {
        pet: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            age: { type: 'string' },
            size: { type: 'string' },
            energy_level: { type: 'string' },
            independence_level: { type: 'string' },
            environment: { type: 'string' },
            images: { type: 'array' },
            requirement: { type: 'array' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            org_id: { type: 'string' },
          },
          required: [
            'id',
            'name',
            'description',
            'age',
            'size',
            'energy_level',
            'independence_level',
            'environment',
            'created_at',
            'updated_at',
            'org_id',
          ],
        },
      },
      required: ['pet'],
    },
  },
  tags: ['pets'],
}

export const petRegistrationSchema = {
  summary: 'Create a new pet',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      age: { type: 'string' },
      size: { type: 'string' },
      independence_level: { type: 'string' },
      energy_level: { type: 'string' },
      environment: { type: 'string' },
      images: { type: 'array', items: { type: 'string' } },
      requirement: { type: 'array', items: { type: 'string' } },
    },
    required: [
      'name',
      'description',
      'age',
      'size',
      'energy_level',
      'independence_level',
      'environment',
    ],
  },
  tags: ['pets'],
  security: [
    {
      AccessToken: [],
    },
  ],
  response: {
    201: {
      description: 'Pet Registration Response',
      type: 'object',
      properties: {
        petId: { type: 'string' },
      },
      required: ['petId'],
    },
  },
}

export const orgRegistrationSchema = {
  summary: 'Register a new org account',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      adminName: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      cep: { type: 'string' },
      address: { type: 'string' },
      whatsapp: { type: 'string' },
    },
    required: [
      'name',
      'adminName',
      'email',
      'password',
      'cep',
      'address',
      'whatsapp',
    ],
  },
  response: {
    201: {
      description: 'Org Registration Response',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
  tags: ['orgs'],
}

export const orgAuthSchema = {
  summary: 'Authenticate an org account',
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      description: 'Org Auth Response',
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
      required: ['access_token'],
    },
  },
  tags: ['orgs'],
}

export const orgRefreshTokenSchema = {
  summary: 'Generate a refresh token',
  response: {
    200: {
      description: 'Org Auth Response',
      type: 'object',
      properties: {
        refresh_token: { type: 'string' },
      },
      required: ['refresh_token'],
    },
  },
  tags: ['orgs'],
}
