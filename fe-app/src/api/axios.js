import axios from "axios";
import ApiError from "./apiError";

const statusLines = {
  500: "Internal Server Error",
  501: "Not Implmented",
  502: "Bad Request",
  503: "Service Unavailable",
  504: "Gatewayh Timeout",
  505: "HTTP Version Not Supported",
  400: "Bad Request",
  401: "Authentication Required",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Request Range Not Satisfiable",
  417: "Expectation Failed",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  0: "Connectivity Issue",
};

/*
 * Usage
 * Import this class
 * Create one global or scoped instance as per usage by
 * const Api = new Api();
 * Api.request("/getXYZ", "GET", {})
 * Api.request("/getXYZ", "GET", {id: 5})
 * Api.request("/postXYZ", "POST", {})
 * Api.request("/postXYZ", "POST", {id: 5})
 * @TODO interceptor to be added, and other methods to be added such as delete, put, patch etc
 */
export default class Api {
  client = {};
  logger = {};

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000/",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Request Wrapper with default success/error actions
   * Params url: Relative api url
   * method: GET or POST
   * params: Object containing Json for get or post request
   * param for get {id: xyz} eq : /api?id=xyz
   */
  async request(url, method, params = {}, contentType = "json") {
    console.log(url, method, params);
    let config = {};
    if (contentType !== "json") {
      config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    }
    switch (method) {
      case "GET":
        try {
          const response = await this.client.get(url, params);
          return this.onSuccess(response);
        } catch (error) {
          return this.onError(url, error);
        }
      case "POST":
        try {
          const response = await this.client.post(url, params, config);
          return this.onSuccess(response);
        } catch (error) {
          return this.onError(url, error);
        }
    }
  }

  onSuccess(response) {
    console.debug("Request Successful!");
    return response.data;
  }

  onError(url, error) {
    console.log("Request Failed:", error);
    if (error.response) {
      console.log("Response Status:", error.response.status);
      console.log("Response Data:", error.response.data);
      console.log("Response Headers:", error.response.headers);
      return this.buildError(
        url,
        error.response.status,
        error.response.statusText
      );
    } else {
      return this.buildError(url, 0, error.message);
    }
  }

  buildError(requestUri, statusCode, statusMessage = null) {
    statusMessage =
      statusMessage == null ? statusLines[statusCode] : statusMessage;
    return new ApiError(requestUri, statusCode, statusMessage);
  }
}
