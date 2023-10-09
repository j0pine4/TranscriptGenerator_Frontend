<template>

    <div class="fixed -z-[10] print:hidden">
        <img class="object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)]" src="~/assets/img/bg_dots.png" alt="">
        <img class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
        <img class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
    </div>

    <div class="relative overflow-x-clip z-10">

        <div class="container mx-auto relative my-12 px-2">

            <profile-user-card class="mb-6"></profile-user-card>

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
                <div id="segment-1" role="tabpanel" aria-labelledby="segment-item-1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    <div v-for="transcript in transcripts">

                        <profile-card :document="transcript"></profile-card>
                        
                    </div>
                    
                </div>
                <div id="segment-2" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="tabpanel" aria-labelledby="segment-item-2" >
                    <div v-for="note in notes">

                        <profile-card :document="note"></profile-card>

                    </div>
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

const {data:transcripts, refetch:refetchTranscripts} = getUserDocuments('TRANSCRIPT', true)
const {data:notes, refetch:refetchNotes} = getUserDocuments('GENERATED', false)


 
</script>

