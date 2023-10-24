<template>

    <background-elements></background-elements>

    <div>
        <div class="container mx-auto relative my-12 px-2">

            <profile-user-card></profile-user-card>

            <!-- <UTabs :items="items" orientation="vertical" :ui="{ wrapper: 'flex items-center gap-4', list: { width: 'w-48' } }" /> -->

            <div class="flex justify-center">
                <div class="flex bg-black border border-white/5 hover:bg-black/80 rounded-lg transition p-1">
                    <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
                    <button @click="refetchTranscripts()" type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-md hover:hover:text-primary dark:text-gray-400 dark:hover:text-white active" id="segment-item-1" data-hs-tab="#segment-1" aria-controls="segment-1" role="tab">
                        Transcripts
                    </button>
                    <button @click="refetchNotes()" type="button" class="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-md hover:hover:text-primary dark:text-gray-400 dark:hover:text-white dark:hover:text-gray-300" id="segment-item-2" data-hs-tab="#segment-2" aria-controls="segment-2" role="tab">
                        AI Summaries
                    </button>
                    </nav>
                </div>
            </div>

            <div class="mt-3 mx-auto">
                <div id="segment-1" role="tabpanel" aria-labelledby="segment-item-1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                    <div v-if="!isLoadingTranscripts" v-for="transcript in transcripts">
                        <profile-card :document="transcript" :deleteDoc="refetchTranscripts" :key="transcript.id"></profile-card>
                    </div>

                    <skeleton-card v-else v-for="i in 10"></skeleton-card>
                    
                </div>
                <div id="segment-2" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="tabpanel" aria-labelledby="segment-item-2" >
                    
                    <div v-if="!isLoadingNotes" v-for="note in notes">
                        <profile-card :document="note" :deleteDoc="refetchNotes" :key="note.id"></profile-card>
                    </div>

                    <skeleton-card v-else v-for="i in 10"></skeleton-card>

                </div>
            </div>
        </div>

    </div>

</template>

<script lang="ts" setup>

definePageMeta({
    middleware: ["is-authenticated"]
})

const { getUserDocuments } = useCustomFetch();

const {data:transcripts, refetch:refetchTranscripts, isLoading: isLoadingTranscripts} = getUserDocuments('TRANSCRIPT', true)
const {data:notes, refetch:refetchNotes, isLoading: isLoadingNotes} = getUserDocuments('GENERATED', false)


 
</script>

