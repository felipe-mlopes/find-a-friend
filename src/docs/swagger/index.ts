export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Documentação da API | Find a Friend',
      description: 'My Description.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'orgs', description: 'Orgs related end-points' },
      { name: 'pets', description: 'Pets related end-points' },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  },
}

export const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
}

export const petsSchema = {
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
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      age: { type: 'string' },
      size: { type: 'string' },
      energy_level: { type: 'string' },
      independence_level: { type: 'string' },
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
  response: {
    201: {
      description: 'Pet Registration Response',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
  tags: ['pets'],
}

export const orgRegistrationSchema = {
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
