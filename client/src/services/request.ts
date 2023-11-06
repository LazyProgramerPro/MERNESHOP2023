import axios, { AxiosInstance } from "axios";
import { store } from "../redux/store";

export class BaseService {
  private baseUrl;
  private withToken;
  public instance: AxiosInstance;

  constructor(baseUrl?: string, withToken: boolean = true) {
    this.baseUrl = baseUrl;
    this.withToken = withToken;

    this.instance = axios.create({
      timeout: 30000,
      timeoutErrorMessage: "Request Timeout",
      baseURL: this.baseUrl,
    });

    const isProd = import.meta.env.NODE_ENV !== "development";

    this.instance.interceptors.request.use(
      (config) => {
        const token = store.getState().user.user?.token.token;
        config.headers.charset = "utf-8";
        if (token && this.withToken) {
          config.headers.authtoken = token;
          config.headers["Content-Type"] = "application/json";
        }
        return config;
      },
      (error) => {
        if (!isProd) {
          console.log(error);
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          originalRequest &&
          error?.toJSON()?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          return this.instance(originalRequest);
        }
        if (!isProd) {
          console.log("Err: ", error);
        }

        return Promise.reject(error?.response?.data);
      }
    );
  }
}
const request = new BaseService(import.meta.env.VITE_APP_API);

export default request.instance;
