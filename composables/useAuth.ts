
import { Register } from "models/authentication";
import { useGlobalState } from "~/stores/globalState"
import { User } from "models/user";

export const useAuth = () => {

    const state = useGlobalState()
    const route = useRoute()
    const router = useRouter()
    const config = useRuntimeConfig()
    const { $axios } = useNuxtApp();

    const login = async (email: string, password: string) => {
        const {data, error} = await useFetch<string>(`${config.public.BASE_URL}/api/user/token/`, {
            method: 'POST',
            credentials: 'include',
            body: {
                email: email,
                password: password
            }
        })

        if(data.value){
            await getUserInfo();
        }
        
        return {data, error}
    }

    const register = async (userCredentials: Register) => {
        const {data, error} = await useFetch<string>('/api/auth/register', {
            method: 'POST',
            body: {
                ...userCredentials
            }
        })

        if(data.value){
            await getUserInfo();
        }
        
        return {data, error}
    }

    const logout = async () => {

        const redirectURLS = [
            '/profile',
        ]

        // Clear user state/tokens
        state.user = null;
        state.isLoggedIn = false;

        const {data, error} = await useFetch<string>(`${config.public.BASE_URL}/api/user/token/remove/`, {
            method: 'GET',
            credentials: 'include'
        })

        if(error.value){
            return error.value
        }

        if(data.value){
            if(redirectURLS.includes(route.path)){
                router.push('/')
            } else {
                return;
            }
        } 
    }

    const refreshToken = async () => {

        try{
            console.log("refreshing token")
            $axios.post('/api/user/token/refresh/')
            .then(async  resp => {
                console.log("Inside response of refreshToken()")
                console.log(resp)
                state.isLoggedIn = true;
                await getUserInfo();
            })

            return "Success"

        } catch(err: any) {

            console.log('Error in refresh')

            console.log(err)

            if(err.response){

                console.log('Error Response found')

                if(err.response.status == 401){
                    console.log('Logging user out')
                    await logout();
                }
            }
            
            return err
        }

    }

    const refreshTokenAxios = async () => {

        const {data, error} = await useFetch<User>(`${config.public.BASE_URL}/api/user/token/refresh/`, {
            method: 'POST',
            credentials: 'include'
        })

        if(error.value){

            if(error.value.response!.status == 401){
                console.log('Logging user out')
                await logout();
            }
            console.log('Error in refresh')
            return error.value
        }

        if(data.value){
            console.log("Inside response of refreshToken()")
            state.isLoggedIn = true;
            await getUserInfo();
        } 



    }

    const getUserInfo = async () => {
        const {data, error} = await useFetch<User>(`${config.public.BASE_URL}/api/auth/users/me/`, {
            method: 'GET',
            credentials: 'include'
        })

        if(error.value){
            return error.value
        }

        if(data.value){
            state.user = data.value;
            state.isLoggedIn = true;
        } 
    }


    return {
        login,
        register,
        logout,
        getUserInfo,
        refreshToken,
        refreshTokenAxios
    }

}