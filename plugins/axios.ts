
import axios from "axios";
import { useGlobalState } from "~/stores/globalState";
export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();
    const { refreshTokenAxios } = useAuth();
    const state = useGlobalState();

    let api = axios.create({
        baseURL: config.public.BASE_URL,
        withCredentials: true
    });

    // Response interceptor for API calls
    api.interceptors.response.use((response) => {
        state.throttleError = false;
        return response
    }, async function (error) {

        const originalRequest = error.config;
        state.throttleError = false;

        if (error.response.status === 429 && !originalRequest._retry) {
            originalRequest._retry = false;
            state.throttleError = true;
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshTokenAxios();            
            return api(originalRequest);
        }

        return Promise.reject(error);
    });

return {
    provide: {
      axios: api,
    },
  };
});