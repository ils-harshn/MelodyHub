import { makeRoute } from "../utils";

// Account Nested
export const INDEX = makeRoute("/");
export const AUTH_LAYOUT = makeRoute("account");

// INDEX NESTED URLS
export const HOME = makeRoute("home", INDEX.endpoint)

// AUTH_LAYOUT NESTED URLS
export const LOGIN = makeRoute("login", AUTH_LAYOUT.endpoint);
export const FORGET_PASSWORD = makeRoute("forgetpassword", AUTH_LAYOUT.endpoint);

export default INDEX;
