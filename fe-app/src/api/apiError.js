export default class ApiError {
  requestUri;
  statusCode;
  statusMessage;

  constructor(requestUri, statusCode, statusMessage) {
    this.requestUri = requestUri;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}
