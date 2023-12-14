import { UseQueriesOptions, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { useGlobalState } from "~/stores/globalState"
import { useAuth } from "./useAuth"
import { Transcript } from "models/transcript"
import { Document } from "models/document"
import { PROMPTS } from "models/prompts"

export const useCustomFetch = () => {
    const state = useGlobalState()
    const config = useRuntimeConfig()
    const router = useRouter();
    const { $axios } = useNuxtApp();
    
    const getTranscriptByID = (video_id: string) => {
        const url = `api/transcripts/create/${video_id}/`

        return useQuery({
            queryKey: ['transcript', video_id],
            queryFn: () => $axios.get<Transcript>(url).then(resp => { return resp.data }),
            // queryFn: () => fetchWithHeaders<Transcript>(url),
            refetchOnWindowFocus: false,
            retry: false
        })
    }

    const generateNotes = (prompt: PROMPTS | string, transcript: string | string[]) => {
        const url = `/api/transcripts/generate/`

        let body = {
            'query' : prompt + transcript
        }

        return useMutation({
            mutationFn: () => $axios.post<string | string[]>(url, body).then(resp => { return resp.data }),
            onSuccess: (resp) => {
                state.generatedNotes = resp;
            }
        })

    }

    const getUserDocuments = (type: string, enabled: boolean) => {
        const url = `api/transcripts/documents/?type=${type}`

        return useQuery({
            queryKey: ['documents', type],
            queryFn: () => $axios.get(url).then(resp => { return resp.data }),
            // queryFn: () => fetchWithHeaders<Document[]>(url),
            enabled: enabled,
            refetchOnWindowFocus: false,
            retry: false
        })
    }

    const getDocumentByID = (id: number) => {
        const url = `api/transcripts/documents/${id}`

        return useQuery({
            queryKey: ['documents', id],
            queryFn: () => $axios.get<Document>(url).then(resp => { return resp.data }),
            // queryFn: () => fetchWithHeaders<Document>(url),
            refetchOnWindowFocus: false,
            retry: false
        })
    }

    const saveDocument = (documentParams: {}, type: string) => {
        const url = `/api/transcripts/documents/create/?type=${type}`
        return $axios.post<Document>(url, documentParams).then(resp => { return resp.data })
    }

    const deleteDocument = async (id: number) => {
        const url = `${config.public.BASE_URL}/api/transcripts/documents/${id}/`

        const { data, error } = await useFetch(url, {
            method: "DELETE",
            credentials: 'include'
        })

        return { data, error }

    }

    const getConversation = (id: number) => {
        const url = `/api/transcripts/conversations/${id}/`

        return useQuery({
            queryKey: ['messages', id],
            queryFn: () => $axios.get(url).then(resp => { return resp.data }),
            refetchOnWindowFocus: false,
            retry: false
        })
    }

    const getMessagesForConversation = (id: number) => {
        const url = `/api/transcripts/conversations/${id}/messages/`

        return useQuery({
            queryKey: ['messages', id],
            queryFn: () => $axios.get(url).then(resp => { return resp.data }),
            refetchOnWindowFocus: false,
            retry: false
        })
    }

    const sendNewMessage = async (conversationID: number, message: string) => {
        const url = `${config.public.BASE_URL}/api/transcripts/conversations/${conversationID}/messages/create/`

        const body = {
            content: message
        }

        const { data, error } = await useFetch(url, {
            method: "POST",
            credentials: 'include',
            body: body
        })

        return { data, error }
    }

    const wrapperTest = async (params:any) => {
        const {data, error, refresh} = await useFetch('https://jsonplaceholder.typicode.com/users', 
        {
            params: params,
            lazy: false
        })
        return {data, error, refresh}
    }

    return {
        getTranscriptByID,
        generateNotes,
        getUserDocuments,
        saveDocument,
        deleteDocument,
        getDocumentByID,
        getConversation,
        getMessagesForConversation,
        sendNewMessage,
        wrapperTest
    }

}
