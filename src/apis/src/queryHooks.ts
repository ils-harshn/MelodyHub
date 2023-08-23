import { useQuery } from "react-query";
import { getData } from "./queryFunctions";
import QUERY_KEYS from "./queryKeys";

export const useJsonHolderData = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.LOGIN_USER],
    queryFn: getData,
    ...config,
  });
