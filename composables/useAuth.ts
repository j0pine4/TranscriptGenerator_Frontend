
import { Register } from "models/authentication";
import { useGlobalState } from "~/stores/globalState"
import { User } from "models/user";

export const useAuth = () => {

    const router = useRouter();
    const supabase = useSupabaseClient();

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return {
        logout
    }

}