export const USER = 'User';

export const USER_VALIDATION = {
  NAME: {
    MAX_LENGTH: {
      VALUE: 100,
      MESSAGE: 'Name must be less than 100 characters'
    },
    REQUIRED: { VALUE: true, MESSAGE: 'Name is required' }
  },
  EMAIL: {
    MAX_LENGTH: {
      VALUE: 100,
      MESSAGE: 'Email must be less than 100 characters'
    },
    REQUIRED: { VALUE: true, MESSAGE: 'Email is required' },
    INVALID: { VALUE: 'Invalid email', MESSAGE: 'Invalid email' }
  },
  PASSWORD: {
    MAX_LENGTH: {
      VALUE: 100,
      MESSAGE: 'Password must be less than 100 characters'
    },
    MIN_LENGTH: {
      VALUE: 8,
      MESSAGE: 'Password must be greater than 8 characters'
    },
    REQUIRED: { VALUE: true, MESSAGE: 'Password is required' }
  }
} as const;
