import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { commands } from '../src/commands';
import { ExceptionHandler } from './exception-handler';
import { isFunction } from 'lodash';
import { Response } from './response';
import { assert } from './util/assert';
import { complete } from './util/complete';
import { die } from './util/die';

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
    let error = null;

    try {
      await this._execute();
    }
    catch (e) {
      error = this._handler.handle(e);
    }

    this._callback(error, this.response.__OUTPUT__);
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

  private _execute () {
    const { command } = this.event.pathParameters;
    const method      = this.event.httpMethod.toUpperCase();
    const args        = Object.assign({}, this.event.queryStringParameters, JSON.parse(this.event.body));
    const fn          = commands[method][command];

    this._args    = args;
    this._command = command;

    assert(isFunction(fn), 'invalid command provided');

    // execute the given command
    return fn(args, this, method);
  }
}
