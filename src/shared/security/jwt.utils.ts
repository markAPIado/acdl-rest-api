import jwt, { JsonWebTokenError, SignOptions } from 'jsonwebtoken';

export function generateToken<T extends object>(
  payload: T,
  secret: string,
  options: SignOptions
) {
  return jwt.sign(payload, secret, {
    ...options,
    expiresIn: options.expiresIn ?? '1d'
  });
}

export type VerifyTokenResultError = {
  name: 'TokenExpiredError' | 'JsonWebTokenError' | 'NotBeforeError';
};

interface VerifyTokenResult<T, E> {
  valid: boolean;
  error: null | E;
  decoded: T | null;
}

export function verifyToken<T, E>(
  token: string,
  secret: string
): VerifyTokenResult<T, E> {
  try {
    const decoded = jwt.verify(token, secret) as T;
    return {
      valid: true,
      error: null,
      decoded
    };
  } catch (error) {
    const jwtError = error as JsonWebTokenError;
    return {
      valid: false,
      error: { name: jwtError.name } as E,
      decoded: null
    };
  }
}
