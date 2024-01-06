import { defineStore } from "pinia"
import { PROMPTS } from "../models/prompts"
import type { User } from "../models/user"

export const useGlobalState = defineStore('globalState', () => {

    const user = ref<User | null>()
    const isLoggedIn = ref<boolean>(false)

    const transcript = ref<string | string[]>("")
    const transcript_token_amount = ref<number>(0)
    const prompt = ref<PROMPTS | string>()
    const generatedNotes = ref<string | string[]>("")
    const currentVideoID = ref<string>("")

    const throttleError = ref<boolean>(false)

    return { user, isLoggedIn, throttleError, transcript, transcript_token_amount, prompt, generatedNotes, currentVideoID }
  })