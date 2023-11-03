
import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();
    const { refreshToken } = useAuth();
    const router = useRouter();

    let api = axios.create({
        baseURL: config.public.BASE_URL,
        withCredentials: true
    });

    // Response interceptor for API calls
    api.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("Refresh token here")
            await refreshToken();            
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