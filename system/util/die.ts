import { Exception } from '../exception';

export function die (errorMessage : string, code = 400) {
  throw new Exception(errorMessage, code);
}
