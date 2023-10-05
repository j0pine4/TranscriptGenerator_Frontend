
export default defineEventHandler( async (event) => {

    const config = useRuntimeConfig()

    try{

        deleteCookie(event, 'refresh')

        return "User Logged out"

    } catch(err) {
        
        return err

    }
    
})