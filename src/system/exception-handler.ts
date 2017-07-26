import { Application } from './app';
import { Exception } from '../exceptions/exception';

export class ExceptionHandler {

  constructor (
    private app : Application
  ) {}

  handle (exception : Exception) {
    if (!(exception instanceof Exception)) return;

    this.app.response.setError(exception.errorMessage, exception.statusCode);
  }
}
