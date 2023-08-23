import { api } from "../api";

export const getData = () => {
  return api({
    method: "get",
    url: "/posts",
  });
};
