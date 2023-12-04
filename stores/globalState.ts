import { defineStore } from "pinia"
import { PROMPTS } from "models/prompts"
import { User } from "models/user"

export const useGlobalState = defineStore('globalState', () => {

    const user = ref<User | null>()
    const isLoggedIn = ref<boolean>(false)

    const transcript = ref<string | string[]>("")
    const prompt = ref<PROMPTS | string>()
    const generatedNotes = ref<string | string[]>("")
    const currentVideoID = ref<string>("")

    const throttleError = ref<boolean>(false)

    return { user, isLoggedIn, throttleError, transcript, prompt, generatedNotes, currentVideoID }
  })