import { UseQueriesOptions, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { useGlobalState } from "~/stores/globalState"
import { useAuth } from "./useAuth"
import { Transcript } from "models/transcript"
import { Document } from "models/document"
import { PROMPTS } from "models/prompts"

export const useCustomFetch = () => {
    const state = useGlobalState()
    const config = useRuntimeConfig()
    const { $axios } = useNuxtApp();

    const axiosTest = () => {

        return useQuery({
            queryKey: ['axios'],
            queryFn: () => $axios.get('/set-cookie/').then(resp => { return resp.data }),
            retry: false
        })
    }
    

    const postWithHeaders = <T>(url: string, params: {}) => {
        return $fetch<T>(`${config.public.BASE_URL}/${url}`, {
            onRequest({request, options}){
                options.headers = state.user ? {"Authorization" :  `Bearer ${state.user}` } : { }
            },
            method: 'POST',
            params: params,
        })
    }

    const getTranscriptByID = (video_id: string) => {
        const url = `api/transcripts/create/${video_id}/`

        return useQuery({
            queryKey: ['transcript', video_id],
            queryFn: () => $axios.get(url).then(resp => { return resp.data }),
            // queryFn: () => fetchWithHeaders<Transcript>(url),
            refetchOnWindowFocus: false,
            retry: false
        })
    }

    const generateNotes = async (prompt: PROMPTS, transcript: string | string[]) => {
        const url = `${config.public.BASE_URL}/api/transcripts/generate/`

        let body = {
            'query' : prompt + transcript
        }

        const { data, error } = await useFetch< string | string[] >(url, {
            method: "POST",
            body: body,
            credentials: 'include'
        })

        return { data, error }

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

    const saveDocument = async (documentParams: {}, type: string) => {
        const url = `${config.public.BASE_URL}/api/transcripts/documents/create/?type=${type}`

        const { data, error } = await useFetch(url, {
            method: "POST",
            body: documentParams,
            credentials: 'include'
        })

        return { data, error }

    }

    const deleteDocument = async (id: number) => {
        const url = `${config.public.BASE_URL}/api/transcripts/documents/${id}/`

        const { data, error } = await useFetch(url, {
            method: "DELETE",
            credentials: 'include'
        })

        return { data, error }

    }


    return {
        getTranscriptByID,
        generateNotes,
        getUserDocuments,
        saveDocument,
        deleteDocument,
        getDocumentByID,
        axiosTest
    }

}
