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

type VerifyTokenResultError =
  | 'TokenExpiredError'
  | 'JsonWebTokenError'
  | 'NotBeforeError';

interface VerifyTokenResult<T> {
  valid: boolean;
  error: null | VerifyTokenResultError;
  decoded: T | null;
}

export function verifyToken<T>(
  token: string,
  secret: string
): VerifyTokenResult<T> {
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
      error: jwtError.name as VerifyTokenResultError,
      decoded: null
    };
  }
}
