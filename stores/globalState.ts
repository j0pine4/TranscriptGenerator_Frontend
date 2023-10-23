import { defineStore } from "pinia"
import { PROMPTS } from "models/prompts"

export const useGlobalState = defineStore('globalState', () => {

    const user = ref<string>("")

    const transcript = ref<string | string[]>("")
    const prompt = ref<PROMPTS>()
    const generatedNotes = ref<string | string[]>("")
    const currentVideoID = ref<string>("")

    return { user, transcript, prompt, generatedNotes, currentVideoID }
  })