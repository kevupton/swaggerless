import { Application } from './app';
import { Exception } from './exception';

export class ExceptionHandler {

  constructor (
    private app : Application
  ) {}

  handle (exception : Exception) {
    if (!(exception instanceof Exception)) return exception;

    this.app.response.setError(exception.errorMessage, exception.statusCode);

    return null;
  }
}
