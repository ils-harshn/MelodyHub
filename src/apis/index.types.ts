import { AxiosRequestConfig } from "axios";

export type BaseQueryProviderProps = {
  children: React.ReactNode;
};

export type AxiosConfig = Omit<AxiosRequestConfig, "baseURL">;
