import axios from "axios";

export const interceptor = () => {
  axios.interceptors.request.use(async (config) => {
    config.withCredentials = config.url?.includes(
      "https://api.odcloud.kr/api/nts-businessman"
    )
      ? false
      : true;
    // if (doRefreshToken === 1 && isAccessTokenExpired()) {
    //   doRefreshToken -= 1;
    //   const result = await refreshToken();
    //   result && saveToken(result);
    //   doRefreshToken += 1;
    // }
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        // response: { status },
      } = error;

      console.log(error);
      // console.log(status);

      // if (status === 401) {
      // const cookie = new Cookies();
      // console.log(cookie.get("sessing"));
      // if (
      //   cookie.get("sessing") &&
      //   error.response.data.message === "notVerifiedSessionInfo"
      // ) {
      //   alert(
      //     "한 시간동안 반응이 없어 세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다."
      //   );
      //   cookie.remove("sessing", {
      //     path: "/",
      //   });
      //   Logout();
      // } else if (cookie.get("sessing") === undefined) {
      //   Logout();
      // }
      // }
      return Promise.reject(error);
    }
  );
};

export const setInitAxioSetting = () => {
  const domain = "http://local.test.com:3005";
  axios.defaults.baseURL = domain;
  console.log(domain);
  interceptor();
};

export const temp = (): string => `temp`;

export const login = (): string => `http://localhost:3005/ac-user/login`;
export const postPlan = (): string => `http://localhost:3005/plan`;
export const getAllPlan = (): string =>
  `http://localhost:3005/plan/today/allUser`;
