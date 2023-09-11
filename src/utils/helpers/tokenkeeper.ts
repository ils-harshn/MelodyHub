export const removeToken = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const setToken = (token: string, rememberMe = false) => {
  removeToken();
  if (rememberMe) localStorage.setItem("token", token);
  else sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};
