export default class managerAPI {

  static URL = 'https://api.everconnect.dk/manager/v1';

  static setConfig(token, contentType, dataInput) {

    let request = {};
    request.headers = {};
    request.data = {};

    if (contentType !== null) {
      request['headers']['Content-Type'] = contentType;
    } else {
      request['headers']['Content-Type'] = "application/json";
    }

    if (token !== null) {
      request['headers']['x-token'] = token
    }

    if (dataInput !== null) {
      request['data'] = dataInput;
    }

    console.log(request);

    return request;
  }

}
