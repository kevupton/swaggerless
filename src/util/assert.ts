import { Exception } from '../exceptions/exception';

export function assert (cond : boolean, message : string, statusCode = 400) {
  if (!cond) throw new Exception(message, statusCode);
}