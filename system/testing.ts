import { IResponse, IResponseBody } from './response';
import { Application } from './app';
import { APIGatewayEvent } from 'aws-lambda';
import { merge } from 'lodash'

interface ITestCommandObj {
  args? : {[key : string] : any};
  requestOptions? : APIGatewayEvent | any;
}

const DEFAULT_OPTIONS : ITestCommandObj = {
  args: {},
  requestOptions: {
    httpMethod: 'GET'
  }
};

type ICallback = (body : IResponseBody, response : IResponse, err : Error) => void;

export function testCommand (command : string, callback : ICallback, config : ITestCommandObj = {}) {

  const request = merge({}, DEFAULT_OPTIONS.requestOptions, config.requestOptions, {
    body: JSON.stringify(config.args || {}),
    path: `/${command}`,
    pathParameters: { command }
  });

  return new Promise(resolve => {
    new Application(request, null, (error, response : IResponse) => {
      let data = null;
      try {
        data = JSON.parse(response.body);
      }
      catch (e) {}

      setTimeout(() => {
        callback(data, response, error);
        resolve();
      });

    });
  });

}

export function testPostCommand  (command : string, callback : ICallback, config : ITestCommandObj = {}) {
  return testCommand(command, callback, merge({}, config, {requestOptions: {httpMethod: 'POST'}}));
}
