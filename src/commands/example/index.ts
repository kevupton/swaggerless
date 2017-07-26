import { Application } from '../../../system/app';
import { Exception } from '../../../system/exception';
import { assert } from '../../../system/util/assert';

/**
 * Serverless Function
 */
export function example (args : any, instance : Application) {

  assert(args.dollarydoos === 400, 'we require 400 dollary doos');

  // exit the code at any time, with an error message and status code
  if (0 > 1) throw new Exception('Some exception message', 402) || instance.die('some exception message', 407);

  // halts execution and returns the current response.
  if (0 < 1) instance.complete();

  // adds data to the data section of the response
  instance.response
    .addData('test', true)
    .addData('args', args);
}
