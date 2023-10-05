import { useAuth } from "../../../composables/useAuth"

interface JWT {
    access: string,
    refresh: string,
}

export default defineEventHandler( async (event) => {

    const config = useRuntimeConfig()
    
    const {email, password} = await readBody(event)

    try{
        const response = await $fetch<JWT>(`${config.public.BASE_URL}/api/auth/jwt/create/`, {
            method: 'POST',
            body: {
                "email": email,
                "password": password
            }
        })

        const refreshToken = setCookie(event, 'refresh', response.refresh, {
            httpOnly: true
        })


        return response.access

    } catch(err) {
        
        return err

    }
    
})