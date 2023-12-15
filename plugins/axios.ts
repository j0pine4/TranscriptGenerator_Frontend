
import axios from "axios";
import { useGlobalState } from "~/stores/globalState";
export default defineNuxtPlugin(async (nuxtApp) => {

    const config = useRuntimeConfig();
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const state = useGlobalState();

    let api = axios.create({
        baseURL: config.public.BASE_URL,
        withCredentials: true,
    });

    // Request interceptor for API calls
    api.interceptors.request.use( async (config) => {
      const { data:session } = await supabase.auth.getSession()
      config.headers.Authorization =  user ? `Bearer ${session.session?.access_token}` : '' ;
      return config;
  });
    
    // Response interceptor for API calls
    api.interceptors.response.use((response) => {
        state.throttleError = false;
        return response
    }, async function (error) {

        const originalRequest = error.config;
        state.throttleError = false;


        if ( (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            const { data, error } = await supabase.auth.refreshSession()  
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