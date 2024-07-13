const badRequestOrgRegistrationError = {
  description: 'Bad request error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Validation error.' },
    issues: {
      type: 'object',
      properties: {
        _errors: {
          type: 'array',
          items: { type: 'string' },
        },
        name: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid name.'],
                },
              },
            },
          },
        },
        email: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid email.'],
                },
              },
            },
          },
        },
        cep: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid CEP.'],
                },
              },
            },
          },
        },
        password: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid password.'],
                },
              },
            },
          },
        },
      },
    },
  },
  required: ['message', 'issues'],
}

const badRequestOrgAuthError = {
  description: 'Bad request error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Validation error.' },
    issues: {
      type: 'object',
      properties: {
        _errors: {
          type: 'array',
          items: { type: 'string' },
        },
        email: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid email.'],
                },
              },
            },
          },
        },
        password: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid password.'],
                },
              },
            },
          },
        },
      },
    },
  },
  required: ['message', 'issues'],
}

const badRequestPetRegistrationError = {
  description: 'Bad request error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Validation error.' },
    issues: {
      type: 'object',
      properties: {
        _errors: {
          type: 'array',
          items: { type: 'string' },
        },
        name: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: ['Invalid name.'],
                },
              },
            },
          },
        },
        age: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: [
                    "Invalid enum value. Expected 'PUPPY' | 'ADULT' | 'SENIOR'",
                  ],
                },
              },
            },
          },
        },
        size: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: [
                    "Invalid enum value. Expected 'SMALL', 'MEDIUM', 'BIG'",
                  ],
                },
              },
            },
          },
        },
        independence_level: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: [
                    "Invalid enum value. Expected 'LOW', 'MEDIUM', 'HIGH'",
                  ],
                },
              },
            },
          },
        },
        energy_level: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: [
                    "Invalid enum value. Expected 'CALM', 'PEACEFUL', 'FUSSY'",
                  ],
                },
              },
            },
          },
        },
        environment: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: {
                type: 'string',
                example: {
                  _errors: [
                    "Invalid enum value. Expected 'TIGHT', 'NORMAL', 'WIDE'",
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
  required: ['message', 'issues'],
}

const unauthorizedError = {
  description: 'Unauthorized error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Unauthorized.' },
  },
  required: ['message'],
}

const notFoundError = {
  description: 'Not found error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Not found.' },
  },
  required: ['message'],
}

const conflictError = {
  description: 'Conflict error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Already exists.' },
  },
  required: ['message'],
}

const notAllowedError = {
  description: 'Not allowed error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Not allowed.' },
  },
  required: ['message'],
}

const internalServerError = {
  description: 'Internal server error',
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Internal server error.' },
  },
  required: ['message'],
}

const petResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    age: { type: 'string', enum: ['PUPPY', 'ADULT', 'SENIOR'] },
    size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'BIG'] },
    energy_level: { type: 'string', enum: ['CALM', 'PEACEFUL', 'FUSSY'] },
    independence_level: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
    environment: { type: 'string', enum: ['TIGHT', 'NORMAL', 'WIDE'] },
    images: { type: 'array', items: { type: 'string' } },
    requirement: { type: 'array', items: { type: 'string' } },
    created_at: { type: 'string' },
    updated_at: { type: 'string', nullable: true },
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
}

export const petsSchema = {
  summary: 'Fetch all available pets',
  response: {
    200: {
      description: 'Pets response',
      type: 'object',
      properties: {
        pets: {
          type: 'array',
          items: petResponse,
        },
      },
      required: ['pets'],
    },
    500: internalServerError,
  },
  tags: ['pets'],
}

export const petsByCharsSchema = {
  summary: 'Fetch available pets by characteristics',
  querystring: {
    age: { type: 'string', enum: ['PUPPY', 'ADULT', 'SENIOR'] },
    energy_level: { type: 'string', enum: ['CALM', 'PEACEFUL', 'FUSSY'] },
    size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'BIG'] },
    independence_level: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
    environment: { type: 'string', enum: ['TIGHT', 'NORMAL', 'WIDE'] },
    page: { type: 'number' },
  },
  response: {
    200: {
      description: 'Pets Response',
      type: 'object',
      properties: {
        pets: {
          type: 'array',
          items: petResponse,
        },
      },
      required: ['pets'],
    },
    404: notFoundError,
    500: internalServerError,
  },
  tags: ['pets'],
}

export const petDetailsSchema = {
  summary: 'Get a pet details by id',
  response: {
    200: {
      description: 'Pet details response successfully',
      type: 'object',
      properties: {
        pet: petResponse,
      },
      required: ['pet'],
    },
    400: {
      description: 'Bad request error',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Validation error.' },
        issues: {
          type: 'object',
          properties: {
            _errors: {
              type: 'array',
              items: { type: 'string' },
            },
            id: {
              type: 'object',
              properties: {
                _errors: {
                  type: 'array',
                  items: {
                    type: 'string',
                    example: {
                      _errors: ['Invalid id.'],
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: ['message', 'issues'],
    },
    404: notFoundError,
    500: internalServerError,
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
      age: { type: 'string', enum: ['PUPPY', 'ADULT', 'SENIOR'] },
      size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'BIG'] },
      energy_level: { type: 'string', enum: ['CALM', 'PEACEFUL', 'FUSSY'] },
      independence_level: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
      environment: { type: 'string', enum: ['TIGHT', 'NORMAL', 'WIDE'] },
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
      description: 'Pet registration response successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Pet was created successfully.' },
      },
      required: ['message'],
    },
    400: badRequestPetRegistrationError,
    401: {
      description: 'Pet registration response without authentication',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized.' },
      },
      required: ['message'],
    },
  },
}

export const petEditSchema = {
  summary: 'Edit a pet record',
  querystring: {
    name: { type: 'string' },
    description: { type: 'string' },
    age: { type: 'string', enum: ['PUPPY', 'ADULT', 'SENIOR'] },
    size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'BIG'] },
    independence_level: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
    energy_level: { type: 'string', enum: ['CALM', 'PEACEFUL', 'FUSSY'] },
    environment: { type: 'string', enum: ['TIGHT', 'NORMAL', 'WIDE'] },
  },
  response: {
    200: {
      description: 'Pet edit record response successfully',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: "The pet's record was successfully updated.",
        },
      },
      required: ['message'],
    },
    401: {
      description: 'Pet edit record response without authentication',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized.' },
      },
      required: ['message'],
    },
    404: notFoundError,
    405: notAllowedError,
    500: internalServerError,
  },
  security: [
    {
      AccessToken: [],
    },
  ],
  tags: ['pets'],
}

export const petDeleteSchema = {
  summary: 'Delete a pet record',
  response: {
    204: {
      description: 'Pet delete record response successfully',
      type: 'null',
    },
    401: {
      description: 'Pet delete record response without authentication',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized.' },
      },
      required: ['message'],
    },
    405: notAllowedError,
    500: internalServerError,
  },
  security: [
    {
      AccessToken: [],
    },
  ],
  tags: ['pets'],
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
    400: badRequestOrgRegistrationError,
    409: conflictError,
    500: internalServerError,
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
      description: 'Org auth response ok',
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
      required: ['access_token'],
    },
    400: badRequestOrgAuthError,
    401: unauthorizedError,
    500: internalServerError,
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
    500: internalServerError,
  },
  tags: ['orgs'],
}
