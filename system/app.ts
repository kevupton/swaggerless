import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { commands } from '../src/commands';
import { ExceptionHandler } from './exception-handler';
import { isFunction } from 'lodash';
import { Response } from './response';
import { assert } from './util/assert';
import { complete } from './util/complete';
import { die } from './util/die';
import { isString } from 'util';
import { Exception } from './exception';

// the commands of the application
export const APP_COMMANDS = Object.keys(commands);

export class Application {

  private _event : APIGatewayEvent;
  private _context : Context;
  private _callback : Callback;
  private _response = new Response();
  private _handler = new ExceptionHandler(this);
  private _command : string;
  private _args : any;

  constructor (event : APIGatewayEvent, context : Context, callback : Callback) {
    this._event = event;
    this._context = context;
    this._callback = callback;

    this.handle();
  }

  private async handle () {
    const self = this;
    let error = null;

    try {
      // if any exceptions are thown inside the promise then they are not picked up so we must catch them.
      await catchPromise(this._execute());
    }
    catch (e) {
      handleError(e);
    }

    resolve();

    function handleError (e) {
      if (isString(e)) e = new Exception(e);
      error = self._handler.handle(e);
    }

    function resolve () {

      if (process.env.DEBUG === 'true' && error) {
        self.response.statusCode = 500;
        self.response.setError(JSON.stringify(error));
        error = null;
      }
      else {
        error = new Error(JSON.stringify(error));
      }

      self._callback(error, self.response.__OUTPUT__);
    }

    function catchPromise (promise) {
      if (promise instanceof Promise) {
        return promise.catch(e => {
          handleError(e);
          resolve();
        });
      }
      return promise;
    }
  }

  get event () {
    return this._event;
  }

  get command () {
    return this._command;
  }

  get args () {
    return this._args;
  }

  get context () {
    return this._context;
  }

  get response () {
    return this._response;
  }

  complete () {
    complete();
  }

  die (errorMessage : string, code = 400) {
    die(errorMessage, code);
  }

  get jsonBody () {
    try {
      return JSON.parse(this.event.body);
    }
    catch (e) {
      return {};
    }
  }

  private _execute () {
    const { command } = this.event.pathParameters;
    const method      = this.event.httpMethod.toUpperCase();
    const args        = Object.assign({}, this.event.queryStringParameters, this.jsonBody);
    const fn          = commands[method][command];

    this._args    = args;
    this._command = command;

    assert(isFunction(fn), 'invalid command provided');

    // execute the given command
    return fn(args, this, method);
  }
}
