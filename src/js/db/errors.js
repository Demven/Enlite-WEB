export const ERROR = {
  INTERNAL: 'INTERNAL_ERROR',

  EMAIL_EXISTS: 'EMAIL_EXISTS',
  LOGIN_EXISTS: 'LOGIN_EXISTS',

  NO_SUCH_USER: 'NO_SUCH_USER',

  USER_ID_INCORRECT: 'USER_ID_INCORRECT',
  LOGIN_INCORRECT: 'LOGIN_INCORRECT',
  EMAIL_INCORRECT: 'EMAIL_INCORRECT',
  PASS_INCORRECT: 'PASS_INCORRECT',
  USER_DATA_INCORRECT: 'USER_DATA_INCORRECT',
};

export function sendError(errorType, msg, originalError) {
  const error = new Error(msg);
  error.name = errorType;
  error.msg = msg;
  error.originalError = originalError;
  return error;
}
