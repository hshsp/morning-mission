import axios from "axios";
import { Cookies } from "react-cookie";

export const interceptor = () => {
  axios.interceptors.request.use(async (config) => {
    config.withCredentials = true;
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      console.log(error);
      const cookie = new Cookies();

      if (status === 401) {
        cookie.remove("acUserRefreshToken");
        cookie.remove("acUserAccessToken");
        window.location.replace("/");
      }
      return Promise.reject(error);
    }
  );
};

export const setInitAxioSetting = () => {
  console.log(process.env.REACT_APP_API_DOMAIN);
  axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;
  interceptor();
};

export const temp = (): string => `temp`;

export const login = (): string => `/ac-user/login`;
export const postPlan = (): string => `/plan`;
export const getAllPlan = (): string => `/plan/today/allUser`;
