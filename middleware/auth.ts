
export default defineNuxtRouteMiddleware((to, from) => {

    const user = useSupabaseUser()

    if(user.value) {
       return true;
    } 
    
    if (!user.value) {
        console.log("No user found, redirecting")
        return navigateTo("/auth/login")
    }



})