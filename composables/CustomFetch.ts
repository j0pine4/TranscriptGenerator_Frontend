import { UseQueriesOptions, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { useGlobalState } from "~/stores/globalState"
import { useAuth } from "./useAuth"
import { Transcript } from "models/transcript"
import { Document } from "models/document"

export const useCustomFetch = () => {
    const state = useGlobalState()
    const config = useRuntimeConfig()
    const { refreshToken } = useAuth()

    const client = useQueryClient()

    const fetchWithHeaders = <T>(url: string) => {
        return $fetch<T>(`${config.public.BASE_URL}/${url}`, {
            onRequest({request, options}){
                options.headers = state.user ? {"Authorization" :  `Bearer ${state.user}` } : { }
            }
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

    const AuthRetryFunction = async (key: string[], failureCount: number, error: any) => {


        if(error.statusCode === 401 && failureCount < 1){
            console.log("Access Expired, refreshing")
            await refreshToken()
            return true
        }

        if(error.statusCode === 401 && failureCount === 1){

            client.cancelQueries({
                queryKey: key
            })

            // Log user out

            return false
        }


        client.cancelQueries({
            queryKey: key
        })

        return false
    }

    const getTranscriptByID = (video_id: string) => {
        const url = `api/transcripts/create/${video_id}/`

        return useQuery({
            queryKey: ['transcript', video_id],
            queryFn: () => fetchWithHeaders<Transcript>(url),
            retry: async (failureCount: number, error: any) => await AuthRetryFunction(['transcript', video_id], failureCount, error),
            refetchOnWindowFocus: false
        })
    }

    const getUserDocuments = (type: string, enabled: boolean) => {
        const url = `api/transcripts/documents/?type=${type}`

        return useQuery({
            queryKey: ['documents', type],
            queryFn: () => fetchWithHeaders<Document[]>(url),
            enabled: enabled,
            retry: async (failureCount: number, error: any) => await AuthRetryFunction(['documents', type], failureCount, error),
            refetchOnWindowFocus: false
        })
    }

    const getDocumentByID = (id: number) => {
        const url = `api/transcripts/documents/${id}`

        return useQuery({
            queryKey: ['documents', id],
            queryFn: () => fetchWithHeaders<Document>(url),
            retry: async (failureCount: number, error: any) => await AuthRetryFunction(['documents', id.toString()], failureCount, error),
            refetchOnWindowFocus: false
        })
    }

    const saveDocument = (documentParams: {}, type: string) => {
        const url = `${config.public.BASE_URL}/api/transcripts/documents/create/?type=${type}`

        const { data, error } = useFetch(url, {
            method: "POST",
            body: documentParams,
            onRequest({request, options}){
                options.headers = state.user ? {"Authorization" :  `Bearer ${state.user}` } : { }
            }
        })

        return { data, error }

    }

    const deleteDocument = async (id: number) => {
        const url = `${config.public.BASE_URL}/api/transcripts/documents/${id}/`

        const { data, error } = await useFetch(url, {
            method: "DELETE",
            onRequest({request, options}){
                options.headers = state.user ? {"Authorization" :  `Bearer ${state.user}` } : { }
            }
        })

        return { data, error }

    }


    return {
        getTranscriptByID,
        getUserDocuments,
        saveDocument,
        deleteDocument,
        getDocumentByID
    }

}
