import { Exception } from '../exception';

export function assert (cond : any, message : string, statusCode = 400) {
  if (!cond) throw new Exception(message, statusCode);
}
