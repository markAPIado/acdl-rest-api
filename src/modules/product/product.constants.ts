export const PRODUCT = 'Product';

export const PRODUCT_VALIDATION = {
  USER: {
    MAX_LENGTH: {
      VALUE: 100,
      MESSAGE: 'User ID must be less than 100 characters'
    },
    REQUIRED: { VALUE: true, MESSAGE: 'User ID is required' }
  },
  NAME: {
    MAX_LENGTH: {
      VALUE: 100,
      MESSAGE: 'Name must be less than 100 characters'
    },
    REQUIRED: { VALUE: true, MESSAGE: 'Name is required' }
  },
  DESCRIPTION: {
    MAX_LENGTH: {
      VALUE: 500,
      MESSAGE: 'Description must be less than 500 characters'
    },
    REQUIRED: { VALUE: true, MESSAGE: 'Description is required' }
  },
  PRICE: {
    MAX_VALUE: { VALUE: 1000000, MESSAGE: 'Price must be less than 1000000' },
    MIN_VALUE: { VALUE: 0, MESSAGE: 'Price must be greater than 0' },
    REQUIRED: { VALUE: true, MESSAGE: 'Price is required' }
  },
  QUANTITY: {
    MAX_VALUE: {
      VALUE: 1000000,
      MESSAGE: 'Quantity must be less than 1000000'
    },
    MIN_VALUE: { VALUE: 0, MESSAGE: 'Quantity must be greater than 0' },
    REQUIRED: { VALUE: true, MESSAGE: 'Quantity is required' }
  },
  IMAGE: {
    MAX_LENGTH: {
      VALUE: 500,
      MESSAGE: 'Image URL must be less than 500 characters'
    },
    REQUIRED: { VALUE: false, MESSAGE: 'Image URL is required' }
  }
} as const;
