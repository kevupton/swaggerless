import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { commands } from '../commands';
import { AutoBind } from '../decorators/auto-bind';
import { ExceptionHandler } from './exception-handler';
import { isString, isObject, isFunction, isUndefined } from 'lodash';
import { Response } from './response';
import { Exception } from '../exceptions/exception';
import { assert } from '../util/assert';

interface ICommandBody {
  command : string;
  args : {
    [key : string] : any;
  };
}

// the commands of the application
export const APP_COMMANDS = Object.keys(commands);

@AutoBind
export class Application {

  private _event : APIGatewayEvent;
  private _context : Context;
  private _callback : Callback;
  private _response = new Response();
  private _handler = new ExceptionHandler(this);
  private _command : string;
  private _args : any;

  initialize (event : APIGatewayEvent, context : Context, callback : Callback) {
    if (this.isInitialized) throw new Exception('App already initialized!');

    this._event = event;
    this._context = context;
    this._callback = callback;

    try {
      this._execute();
    }
    catch (e) {
      this._handler.handle(e);
      this._resolveCallback(e);
    }
  }

  get isInitialized () {
    return !!this._callback;
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
    const {command, args} = JSON.parse(this.event.body) as ICommandBody;

    this._command = command;
    this._args = args;

    assert(isString(command), 'command is required');
    assert(isObject(args) || isUndefined(args), 'args is supposed to be an object');
    assert(isFunction(commands[command]), 'invalid command provided');

    commands[command](args);
  }

  private _resolveCallback (e : any) {
    if (e instanceof Error) {
      this._callback(e);
    }
    else {
      this._callback(null, this.response);
    }
  }
}

export const App = new Application();
