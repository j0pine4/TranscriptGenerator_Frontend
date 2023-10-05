import { PROMPTS } from "models/prompts";
import { RuntimeConfig } from "nuxt/schema";

export const useApi = () => {

    const { customQuery } = useCustomFetch()

    const getTranscriptByID = (video_id: string) => {
        return customQuery(['transcript', video_id], '/api/transcripts/create/${video_id}/')
    }

    return {
        getTranscriptByID
    }

}

export class API {
    config: RuntimeConfig;
    transcript: Transcript
    generate: Generate

    constructor(){
        this.config = useRuntimeConfig();
        this.transcript = new Transcript(this.config);
        this.generate = new Generate(this.config);
    }
}

class Transcript {
    config: RuntimeConfig;

    constructor(config: RuntimeConfig){
        this.config = config;
    }

    async get(video_id: string | string[]) {
        const { data, error } = await useFetch<string | string[]>(`${this.config.public.BASE_URL}/api/transcripts/create/${video_id}/`)
        return { data, error }
    }
}
class Generate {
    config: RuntimeConfig;

    constructor(config: RuntimeConfig){
        this.config = config;
    }

    async create(prompt: PROMPTS, transcript: string | string[]) {
        let body = {
            'query' : prompt + transcript
        }

        const { data, error } = await useFetch<string | string[]>(`${this.config.public.BASE_URL}/api/transcripts/generate/`, {
            method: "POST",
            body: body
        })

        return { data, error }
    }
}