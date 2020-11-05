import { serviceMaker, methods } from "./index";

export const AUTH_LOGIN = payload =>
  serviceMaker("/auth/login", methods.POST, payload);
export const AUTH_USER_REGISTER = payload =>
  serviceMaker("/auth/user", methods.POST, payload);
