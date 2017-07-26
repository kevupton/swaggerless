
export interface IHeadersObject {
  [key : string] : string;
}

export interface IResponseBody {
  statusCode : number;
  data? : {
    [key : string] : any;
  };
  errorMessage? : string;
}

export class Response {
  statusCode = 200;
  headers : IHeadersObject;

  private _error : string;
  private _data = {};

  /**
   * Body converts the response data and errors into a JSON string.
   *
   * @return {string}
   */
  get body () {
    const body : IResponseBody = {
      statusCode: this.statusCode
    };

    if (this._error) {
      if (body.statusCode === 200) body.statusCode = 400;
      body.errorMessage = this._error;
    }
    else if (Object.keys(this._data).length > 0) {
      body.data = this._data;
    }

    return JSON.stringify(body);
  }

  get __OUTPUT__ () {
    return {
      statusCode: this.statusCode,
      headers: this.headers,
      body: this.body
    };
  }

  setHeaders (headers : any) {
    this.headers = Object.assign({}, this.headers, headers);
  }

  /**
   * Add data to the response
   *
   * @param key
   * @param value
   */
  addData (key : string, value : any) {
    this._data[key] = value;
  }

  /**
   * Removes data from the response
   *
   * @param key
   */
  removeData (key : string) {
    delete this._data[key];
  }

  /**
   * Sets the response error message
   *
   * @param message
   */
  setErrorMessage (message : string) {
    this._error = message;
  }

  setError (message : string, code = 400) {
    this.setErrorMessage(message);
    this.statusCode = code;
  }

  clearErrors () {
    this.statusCode = 200;
    delete this._error;
  }

  clearData () {
    this._data = {};
  }
}
