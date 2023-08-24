export const setToken = (token: string, rememberMe = false) => {
  if (rememberMe) localStorage.setItem("token", token);
  else sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
