import { HttpException, HttpStatus } from '@nestjs/common';
import { EXCEPTIONS, ErrorMessage, Exception } from './error-code-list';

export class CustomHttpException extends HttpException {
  constructor(
    exception: Exception,
    message?: ErrorMessage,
    statusCode?: HttpStatus,
  ) {
    if (message) exception.message = message;
    if (statusCode) exception.statusCode = statusCode;
    super(exception, exception.statusCode);
  }

  static createException(errorCode: keyof typeof EXCEPTIONS) {
    const exceptionData = EXCEPTIONS[errorCode];
    return new CustomHttpException(exceptionData);
  }
}
