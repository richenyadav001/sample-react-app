import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Api from "../../api/axios";
import {
  expectedGetProductData,
  expectedLoginSuccessData,
  loginData,
} from "./constantsMocks";

const AxiosApi = new Api();
const mock = new MockAdapter(axios);
const responses = [
  ["POST", "/user-exists", 200, true],
  ["POST", "/login", 200, expectedLoginSuccessData],
  ["GET", "/products", 200, expectedGetProductData],
];

describe("Axios Api", () => {
  beforeEach(() => {
    mock.reset();
  });
  afterEach(() => {
    mock.reset();
  });

  it("should check user-exists", async () => {
    mock.onAny().reply((config) => {
      const [method, url, ...response] = responses.shift();
      if (config.url === url && config.method.toUpperCase() === method)
        return response;
      // Unexpected request, error out
      return [500, {}];
    });

    const data = await AxiosApi.request(
      "/user-exists",
      "POST",
      JSON.stringify({ email: "richen.yadav@soprasteria.com" })
    );
    console.log(data);

    expect(data).toEqual(true);
  });

  it("should get products lists", async () => {
    mock.onAny().reply((config) => {
      const [method, url, ...response] = responses.shift();
      if (config.url === url && config.method.toUpperCase() === method)
        return response;
      // Unexpected request, error out
      return [500, {}];
    });

    const data = await AxiosApi.request("/products", "GET", JSON.stringify({}));
    console.log(data);
    expect(data[0].items[0]).toEqual(expectedGetProductData);
  });

  it("should login user", async () => {
    mock.onAny().reply((config) => {
      const [method, url, ...response] = responses.shift();
      if (config.url === url && config.method.toUpperCase() === method)
        return response;
      // Unexpected request, error out
      return [500, {}];
    });

    const data = await AxiosApi.request(
      "/login",
      "POST",
      JSON.stringify(loginData)
    );
    console.log(data);
    expect(data).toEqual(expectedLoginSuccessData);
  });
});
