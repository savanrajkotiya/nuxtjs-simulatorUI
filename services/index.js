import Axios from "axios";
import store from "../store";
import router from "../router";
import Vue from "vue";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export function isValidResponse(resp) {
  return resp && resp.status === 200 && resp.data.status === 1;
}

export const AxiosInstance = Axios.create({
  baseURL:
    process.env.VUE_APP_API_LOCATION !== undefined
      ? "http://test.com"
      : "http://test.com"
});

AxiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("test:access_token");

  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH"
};

export class APIError {
  message;

  constructor(msg) {
    this.message = msg;
  }

  get getMessage() {
    return this.message;
  }
}

export const serviceMaker = async (url, method, data = {}) => {
  try {
    let result;
    const APIInstance = AxiosInstance;

    switch (method) {
      case "GET": {
        result = await APIInstance.get(url);
        break;
      }
      case "POST": {
        result = await APIInstance.post(url, data);
        break;
      }
      case "PUT": {
        result = await await APIInstance.put(url, data);
        break;
      }
      case "PATCH": {
        result = await await APIInstance.patch(url, data);
        break;
      }
      case "DELETE": {
        result = await APIInstance.delete(url);
        break;
      }
      default: {
        // eslint-disable-next-line no-throw-literal
        throw "InvalidMethod";
      }
    }
    if (!isValidResponse) {
      // eslint-disable-next-line no-throw-literal
      throw "InvalidResponse";
    }
    return result.data;
  } catch (err) {
    // validationMessages.validationMessages(403);
    if (err.response.status === 401) {
      store.dispatch("auth/resetUser");
      if (router.history.current.fullPath !== "/login") {
        router.push({ name: "Login" });
        Vue.notify({
          group: "eb-notification",
          title: "Unauthorized Access.",
          text: "Your Authorization Token Has Expired!",
          type: "error",
          duration: 7000
        });
      }
    }
    // tslint:disable-next-line:no-console
    throw new APIError(
      err.response.data ? err.response.data : "Something went wrong"
    );
  }
};
