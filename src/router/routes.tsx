import { makeRoute } from "../utils";

export const INDEX = makeRoute("/");

// Account Nested
export const AUTH_LAYOUT = {
    path: "account",
};

export const LOGIN = makeRoute("login", AUTH_LAYOUT.path);
export const FORGET_PASSWORD = makeRoute("forgetpassword", AUTH_LAYOUT.path);

export default INDEX;
