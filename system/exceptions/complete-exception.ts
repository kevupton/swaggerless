import { Exception } from '../exception';

export class CompleteExecution extends Exception {
  constructor () {
    super(null, 200);
  }
}