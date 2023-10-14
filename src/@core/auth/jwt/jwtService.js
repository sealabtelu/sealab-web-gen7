import axios from "axios"
import jwtDefaultConfig from "./jwtDefaultConfig"

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        config.baseURL = import.meta.env.VITE_API_BASE_URL
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        // ** Tambahkan header CORS
        config.headers['Access-Control-Allow-Origin'] = import.meta.env.VITE_WEB_BASE_URL
        return config
      },
      (error) => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        // const { config, response } = error
        // const originalRequest = config

        // ** if (status === 401) {
        // if (response && response.status === 401) {
        //   if (!this.isAlreadyFetchingAccessToken) {
        //     this.isAlreadyFetchingAccessToken = true;
        //     this.refreshToken().then((r) => {
        //       this.isAlreadyFetchingAccessToken = false;

        //       // ** Update accessToken in localStorage
        //       this.setToken(r.data.accessToken);
        //       this.setRefreshToken(r.data.refreshToken);

        //       this.onAccessTokenFetched(r.data.accessToken);
        //     });
        //   }
        //   const retryOriginalRequest = new Promise((resolve) => {
        //     this.addSubscriber((accessToken) => {
        //       // ** Make sure to assign accessToken according to your response.
        //       // ** Check: https://pixinvent.ticksy.com/ticket/2413870
        //       // ** Change Authorization header
        //       originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        //       resolve(this.axios(originalRequest));
        //     });
        //   });
        //   return retryOriginalRequest;
        // }
        return Promise.reject(error)
      }
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }
}
