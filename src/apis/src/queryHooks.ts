import { useMutation } from "react-query";
import QUERY_KEYS from "./queryKeys";
import { loginUser } from "./queryFunctions";
import { LoginPayloadType } from "./payload.types";

export const useLoginMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload: LoginPayloadType) =>
      loginUser(payload.email, payload.password),
    mutationKey: [QUERY_KEYS.LOGIN_USER],
    ...config,
  });
