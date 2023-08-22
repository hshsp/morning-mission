import axios from "axios";
import { Cookies } from "react-cookie";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

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
        response: {
          status,
          data: { message },
        },
      } = error;

      console.log(error);
      console.log(message);
      const cookie = new Cookies();

      if (status === 401) {
        if (message === "ACCESS_TOKEN_ERROR") {
          const res = await axios.get(getRefreshToken());
          console.log(res.status);

          if (res.status === 200) {
            return instance.request(config);
          }
        }
        if (message === "REFRESH_TOKEN_ERROR") {
          cookie.remove("acUserRefreshToken");
          cookie.remove("acUserAccessToken");
          window.location.pathname !== "/" && window.location.replace("/");
        }
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

export const login = (): string => `/user/login`;
export const getRefreshToken = (): string => `/user/refresh`;
export const postPlan = (): string => `/plan`;
export const getAllPlan = (): string => `/plan/today/allUser`;
export const getAllPlanOthers = (): string => `/plan/today/others`;

export const getMyPlan = (): string => `/plan/today/mine`;
export const getMyPlanHistory = (): string => `/plan/history/mine`;
export const patchMyPlan = (): string => `/plan/today/mine`;
export const deleteMyPlan = (planId: number): string => `/plan/${planId}`;

export const patchUserPassword = (): string => `/user/pw`;
