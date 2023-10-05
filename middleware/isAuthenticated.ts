import { useGlobalState } from "~/stores/globalState"

export default defineNuxtRouteMiddleware(async (to, from) => {

    const state = useGlobalState()
    const {refreshToken} = useAuth()

    if(!state.user) {
        await refreshToken()
    }

})