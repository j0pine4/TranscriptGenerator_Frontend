import { UseQueriesOptions, useQuery, useQueryClient } from "@tanstack/vue-query"
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


    return {
        getTranscriptByID,
        getUserDocuments
    }

}
