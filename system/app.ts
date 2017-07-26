import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { commands } from '../src/commands';
import { ExceptionHandler } from './exception-handler';
import { isString, isObject, isFunction, isUndefined } from 'lodash';
import { Response } from './response';
import { assert } from './util/assert';

interface ICommandBody {
  command : string;
  args : {
    [key : string] : any;
  };
}

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

    let error = null;

    try {
      this._execute();
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

  private _execute () {
    const {command, args} = (JSON.parse(this.event.body) || {}) as ICommandBody;

    this._command = command;
    this._args = args;

    assert(isString(command), 'command is required');
    assert(isObject(args) || isUndefined(args), 'args is supposed to be an object');
    assert(isFunction(commands[command]), 'invalid command provided');

    commands[command](args, this);
  }
}
