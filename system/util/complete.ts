import { CompleteExecution } from '../exceptions/complete-exception';

export function complete () {
  throw new CompleteExecution();
}
