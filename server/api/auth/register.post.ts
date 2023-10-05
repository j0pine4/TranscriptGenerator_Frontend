import { useAuth } from "../../../composables/useAuth"

interface JWT {
    access: string,
    refresh: string,
}

export default defineEventHandler( async (event) => {

    const config = useRuntimeConfig()
    
    const {email, password, firstName, lastName} = await readBody(event)

    try{
        const response = await $fetch<JWT>(`${config.public.BASE_URL}/api/auth/users/`, {
            method: 'POST',
            body: {
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
            }
        })

        return "User Registered"

    } catch(err) {
        
        return err

    }
    
})