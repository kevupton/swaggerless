import { Application } from '../../../system/app';

/**
 * Serverless Function
 */
export function example (args : any, instance : Application) {
  instance.response.addData('test', true);
  instance.response.addData('args', args);
}
