import jwt_decode from "jwt-decode";
import { Register } from "models/authentication";
import { useGlobalState } from "~/stores/globalState"

export interface User {
    name: string
}

export const useAuth = () => {

    const state = useGlobalState()
    const route = useRoute()
    const router = useRouter()

    const login = async (email: string, password: string) => {
        const {data, error} = await useFetch<string>('/api/auth/login', {
            method: 'POST',
            body: {
                email: email,
                password: password
            }
        })

        if(data.value){
            state.user = data.value
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
            state.user = data.value
        }
        
        return {data, error}
    }

    const logout = async () => {

        const redirectURLS = [
            '/profile',
        ]

        if(!state.user){
            throw Error("There is no user logged in, can't log out");
        }

        // Clear user state/tokens
        state.user = "";
        await useFetch<string>('/api/auth/logout');

        if(redirectURLS.includes(route.path)){
            router.push('/')
        }

    }

    const refreshToken = async () => {
        const {data, error} = await useFetch<string>('/api/auth/refresh')

        if(error.value){
            console.log(error.value)
            return error.value
        }

        if(data.value){
            console.log("User found")
            state.user = data.value
        } 

    }

    const getUserFromToken = () => {
        const user: User = jwt_decode(state.user)
        return user;
    }


    return {
        login,
        register,
        logout,
        getUserFromToken,
        refreshToken
    }

}