
interface response {
    access: string
}

export default defineEventHandler( async (event) => {

    const config = useRuntimeConfig()
    const refreshToken = getCookie(event, 'refresh')

    if(!refreshToken){
        return;
    }

    try{
        const response = await $fetch<response>(`${config.public.BASE_URL}/api/auth/jwt/refresh/`, {
            method: 'POST',
            body: {
                "refresh": refreshToken,
            }
        })

        return response.access

    } catch(err: any) {
        
        if (err.response && err.response.status === 401){
            deleteCookie(event, 'refresh')
        }

        return err

    }
    
})