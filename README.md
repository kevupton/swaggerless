# Swaggerless

A command driven approach to serverless.  *~ Bootstrap framework. ~*


----------

###Features
 1. Typescript
 2. Eslint
 3. Serverless
 4. Webpack

### Simply register your commands in the `commands.ts`

```javascript
import { example } from './commands/example';

/*
    Add your functions to the array of commands, to register them in the api.
    Once added they will be able to be used via key name.
 */
export const commands = {
  example
};
```


### Example Command:

```javascript
import { Application } from '../../../system/app';
import { Exception } from '../../../system/exception';
import { assert } from '../../../system/util/assert';

/**
 * Swaggerless Command
 *
 * @param args Object containing all of the given arguments for the command.
 * @param instance The application instance.
 */
export function example (args : any, instance : Application) {

  // require an argument to exist in the arguments given
  assert(args.dollarydoos === 400, 'we require 400 dollary doos');

  // exit the code at any time, with an error message and status code
  if (0 > 1) throw new Exception('Some exception message', 402) || instance.die('some exception message', 407);

  // add data to the data object, in the response
  instance.response.addData('exist', 'yes i do');

  // halts execution and returns the current response.
  instance.complete();

  // this code below will not be executed because of instance.complete()
  instance.response
    .addData('test', true)
    .addData('args', args);
}

```