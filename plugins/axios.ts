
import axios from "axios";
export default defineNuxtPlugin(async (nuxtApp) => {

    const config = useRuntimeConfig();
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    
    const { data:session } = await supabase.auth.getSession()

    let api = axios.create({
        baseURL: config.public.BASE_URL,
        withCredentials: true,
        headers: {
            Authorization: user ? `Bearer ${session?.session?.access_token}` : ''
        }
    });

return {
    provide: {
      axios: api,
    },
  };
});