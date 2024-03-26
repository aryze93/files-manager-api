import { HttpStatus } from '@nestjs/common';

export type ErrorMessage = string | string[];
export interface Exception {
  errorCode: string;
  statusCode: HttpStatus;
  message: ErrorMessage;
}

export const EXCEPTIONS = {
  NOT_FOUND: <Exception>{
    statusCode: HttpStatus.NOT_FOUND,
    message: 'the specified record has not been found',
    errorCode: 'NOT_FOUND',
  },
  UNAUTHORIZED: <Exception>{
    statusCode: HttpStatus.UNAUTHORIZED,
    message:
      'lacks of valid authentication credentials for the target resource',
    errorCode: 'UNAUTHORIZED',
  },
  BAD_REQUEST: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid request',
    errorCode: 'BAD_REQUEST',
  },
  EXISTING_EMAIL: <Exception>{
    statusCode: HttpStatus.CONFLICT,
    message: 'this email has already been used',
    errorCode: 'EXISTING_EMAIL',
  },
  EXISTING_PHONE: <Exception>{
    statusCode: HttpStatus.CONFLICT,
    message: 'this phone number has already been used',
    errorCode: 'EXISTING_PHONE',
  },
  INACTIVE_ACCOUNT: <Exception>{
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Your account has been deactivated',
    errorCode: 'INACTIVE_ACCOUNT',
  },
  SERVER_ERROR: <Exception>{
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong. Please try again',
    errorCode: 'SERVER_ERROR',
  },
  RESTRICTED_ACCESS: <Exception>{
    statusCode: HttpStatus.FORBIDDEN,
    message: 'You do not have access to this content at the moment.',
    errorCode: 'RESTRICTED_ACCESS',
  },
  WRONG_PASSWORD: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid current password',
    errorCode: 'WRONG_PASSWORD',
  },
  WRONG_CREDENTIALS: <Exception>{
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Wrong phone or password',
    errorCode: 'WRONG_CREDENTIALS',
  },
  NOT_YET_IMPLEMENTED: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Service not yet implemented',
    errorCode: 'NOT_YET_IMPLEMENTED',
  },
  TRANSACTION_DONE: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Transaction already done',
    errorCode: 'TRANSACTION_DONE',
  },
  CLIENT_BALANCE_INSUFFICIENT: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Client balance not sufficient',
    errorCode: 'CLIENT_BALANCE_INSUFFICIENT',
  },
  WALLET_LOGIN_FAILED: <Exception>{
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Failed to login to Wallet API',
    errorCode: 'WALLET_LOGIN_FAILED',
  },
  WRONG_OTP_CODE: <Exception>{
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'You have entered a wrong code',
    errorCode: 'WRONG_OTP_CODE',
  },
  APPLICATION_EXISTS: <Exception>{
    statusCode: HttpStatus.CONFLICT,
    message: 'Application name exists',
    errorCode: 'APPLICATION_EXISTS',
  },
  APPLICATION_BLOCKED: <Exception>{
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Application blocked',
    errorCode: 'APPLICATION_BLOCKED',
  },
  PAYMENT_REMINDER_CONFIG_EXISTS: <Exception>{
    statusCode: HttpStatus.CONFLICT,
    message: 'Payment reminder config already exists',
    errorCode: 'PAYMENT_REMINDER_CONFIG_EXISTS',
  },
};
