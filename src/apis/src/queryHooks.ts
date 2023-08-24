import { useMutation } from "react-query";
import QUERY_KEYS from "./queryKeys";
import { loginUser, verifyToken } from "./queryFunctions";
import { LoginPayloadType } from "./payload.types";
import { TokenType } from "../../contexts/Context.types";

export const useLoginMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: LoginPayloadType) =>
      loginUser(payload.email, payload.password),
    mutationKey: [QUERY_KEYS.LOGIN_USER],
    ...config,
  });

export const useVerifyTokenMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: TokenType) => verifyToken(payload),
    ...config,
  });
