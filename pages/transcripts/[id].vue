<template>
    <!-- Hero -->

    <generate-modal id="generate-modal" header="Generate" title="Create notes, pull key terms or make a blog post from your transcript...">

        <!-- Card -->
        <div @click="handlePrompt(PROMPTS.NOTES)" class="cursor-pointer bg-white/5 p-4 transition duration-300 rounded-md hover:bg-white/10">
            <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
                    <PencilSquareIcon class="w-5 h-5 text-primary"></PencilSquareIcon>    
                </div>

                <div class="grow ml-6">
                    <h3 class="text font-bold text-white">
                        Detailed Notes
                    </h3>
                    <p class="mt-1 text-sm font-light text-gray-400">
                        Expand on each section of the transcript to create comprehensive study notes.
                    </p>
                </div>
            </div>
        </div>
        <!-- End Card -->
        
        <!-- Card -->
        <div @click="handlePrompt(PROMPTS.KEY_POINTS)" class="cursor-pointer bg-white/5 p-4 transition duration-300 rounded-md hover:bg-white/10">
            <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
                    <KeyIcon class="w-5 h-5 text-primary"></KeyIcon>    
                </div>

                <div class="grow ml-6">
                    <h3 class="text font-bold text-white">
                        Key Points
                    </h3>
                    <p class="mt-1 text-sm font-light text-gray-400">
                        A concise summary of the most important takeaways from the transcript.
                    </p>
                </div>
            </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div @click="handlePrompt(PROMPTS.DISCUSSION)" class="cursor-pointer bg-white/5 p-4 transition duration-300 rounded-md hover:bg-white/10">
            <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
                    <MegaphoneIcon class="w-5 h-5 text-primary"></MegaphoneIcon>    
                </div>

                <div class="grow ml-6">
                    <h3 class="text font-bold text-white">
                        Discussion Prompts
                    </h3>
                    <p class="mt-1 text-sm font-light text-gray-400">
                        Engaging discussions or debates related to the transcript's topic
                    </p>
                </div>
            </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div @click="handlePrompt(PROMPTS.Q_AND_A)" class="cursor-pointer bg-white/5 p-4 transition duration-300 rounded-md hover:bg-white/10">
            <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
                    <QuestionMarkCircleIcon class="w-5 h-5 text-primary"></QuestionMarkCircleIcon>    
                </div>

                <div class="grow ml-6">
                    <h3 class="text font-bold text-white">
                        Question and Answer
                    </h3>
                    <p class="mt-1 text-sm font-light text-gray-400">
                        Create a list of questions based on the content of the transcript and their respective answers.
                    </p>
                </div>
            </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div @click="handlePrompt(PROMPTS.REAL_WORLD)" class="cursor-pointer bg-white/5 p-4 transition duration-300 rounded-md hover:bg-white/10">
            <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
                    <GlobeAmericasIcon class="w-5 h-5 text-primary"></GlobeAmericasIcon>    
                </div>

                <div class="grow ml-6">
                    <h3 class="text font-bold text-white">
                        Real-world Applications
                    </h3>
                    <p class="mt-1 text-sm font-light text-gray-400">
                        Explore how the concepts discussed in the transcript can be applied in real-life scenarios.
                    </p>
                </div>
            </div>
        </div>
        <!-- End Card -->


    </generate-modal>

    <!-- Saving modal -->
    <generate-modal id="transcript-save-modal" header="Save Transcript">

        <div class="col-span-3">
            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
            <iframe class="w-full h-[250px] mb-6 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + video_id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        
            <form @submit.prevent="handleSave()" class="flex flex-col gap-4">

                <input v-model="transcriptSave.title" id="transcript-title" type="text" required maxlength="255" placeholder="Title" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4">
        
                <textarea v-model="transcriptSave.description" id="transcript-description" placeholder="Description" maxlength="255" required class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4"></textarea>

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full"> Save </button>
            
            </form>
        
        </div>
    </generate-modal>
    
    <div class="container mx-auto relative">


        <div class="fixed -z-[10] print:hidden">
            <img class="object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)]" src="~/assets/img/bg_dots.png" alt="">
            <img class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
            <img class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
        </div>

        <!-- Back Button -->
        <NuxtLink to="/" class="print:hidden mt-6 text-white flex gap-2 items-center justify-center w-fit"> 
            <ArrowLeftIcon class="h-6 w-6  mb-1"></ArrowLeftIcon>
            Back 
        </NuxtLink>
        
        <div class="grid grid-cols-12 gap-6 relative">

            <div class="col-span-12 md:col-span-8 bg-black/75 py-8 px-6 lg:px-24 rounded-xl my-4 print:border-none border-2 border-dark-gray backdrop:blur-3xl">
                    
                <div class="mb-6 text-center print:hidden">
                    <h1 class="text-3xl sm:text-5xl lg:text-6xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Enjoy your Transcript </h1>
                    <p class="text-white"> You can print or copy this transcript or use AI to generate notes... </p>
                </div>

                <hr class="mb-6 print:hidden">

                <div class="text-white flex gap-4 items-center mb-6 justify-center print:hidden">

                    <div v-if="transcript?.tokenCount! < 4000" class="flex flex-col items-center justify-center  text-primary font-bold cursor-pointer hover:scale-105 duration-300 transition-all" data-hs-overlay="#generate-modal">
                        <AcademicCapIcon class="h-6 w-6  mb-1"></AcademicCapIcon>
                        <p> Generate </p>
                    </div>

                    <div v-else class="hs-tooltip inline-block">
                        <button type="button" class="hs-tooltip-toggle flex-col items-center justify-center inline-flex rounded-full text-white/25">
                            <AcademicCapIcon class="h-6 w-6  mb-1"></AcademicCapIcon>
                            <p> Generate </p>
                            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 max-w-xs transition-opacity inline-block absolute invisible z-10 py-2 px-4 border border-dark-gray bg-black text-white rounded text-xs" role="tooltip">
                                This transcript is too long for an AI summary, we are working on a solution to this in the near future!
                            </span>
                        </button>
                    </div>

                    <p> · </p>

                    <div class="flex flex-col items-center justify-center font-light cursor-pointer hover:text-primary duration-300 transition-all" @click='copy(transcript?.transcript!)'>
                        <ClipboardDocumentIcon class="h-6 w-6  mb-1"></ClipboardDocumentIcon>
                        <p> Copy </p>
                    </div>

                    <p> · </p>

                    <div @click="handlePrint()" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <PrinterIcon class="h-6 w-6 mb-1"></PrinterIcon>
                        <p> Print </p>
                    </div>

                    <p> · </p>

                    <div v-if="state.user" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all" data-hs-overlay="#transcript-save-modal">
                        <DocumentPlusIcon class="h-6 w-6 mb-1"></DocumentPlusIcon>
                        <p> Save </p>
                    </div>

                    <div v-else class="hs-tooltip inline-block">
                        <button type="button" class="hs-tooltip-toggle flex-col items-center justify-center inline-flex rounded-full text-white/25">
                            <DocumentPlusIcon class="h-6 w-6 mb-1"></DocumentPlusIcon>
                            <p> Save </p>
                            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 max-w-xs transition-opacity inline-block absolute invisible z-10 py-2 px-4 border border-dark-gray bg-black text-white rounded text-xs" role="tooltip">
                                You must be Logged in to save this transcript
                            </span>
                        </button>
                    </div>

                </div>
                


                <!-- <h1 v-if="state.transcript"> Tokens: {{ tokenNumbers(state.transcript) }} </h1> -->

                <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
                <iframe class="w-full h-[500px] mb-12 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + video_id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                
                <div v-if="isLoading">
                    <skeleton-loader></skeleton-loader>
                </div>
                
                <div v-if="!error && !isLoading">
                    <h1  class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Transcript: </h1>
                    <p class="text-white print:text-black leading-8"> {{ transcript?.transcript }} </p>
                </div>

                <div v-if="error">
                    <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> Something went wrong... </h1>
                    <p class="text-white print:text-black leading-8"> {{ error }} </p>
                </div>
                

            </div>
            
            <sidebar></sidebar>
            

        </div>
    </div>


    <!-- End Hero -->
  </template>
  
  <script setup lang="ts">
    import { useClipboard } from '@vueuse/core'
    import { useGlobalState } from '~/stores/globalState'
    import { PROMPTS } from '~/models/prompts'
    import { Document } from '~/models/document'
    import { ClipboardDocumentIcon, PrinterIcon, ArrowLeftIcon, AcademicCapIcon, PencilSquareIcon, KeyIcon, MegaphoneIcon, QuestionMarkCircleIcon, GlobeAmericasIcon, DocumentPlusIcon  } from '@heroicons/vue/24/outline'

    definePageMeta({
        middleware: ["is-authenticated"]
    })

    const { getTranscriptByID, saveDocument } = useCustomFetch();
    const { removeModals } = useUtils();
    const router = useRouter();
    const route = useRoute();
    const video_id: string = route.params.id.toString();

    const transcriptSave = ref({
        videoID: '',
        title: '',
        description: '',
        content: '',
    })
    
    const { text, copy, copied, isSupported } = useClipboard()

    const state = useGlobalState()
    const {data: transcript, error, isLoading} = getTranscriptByID(video_id)

    const handlePrompt = (prompt: PROMPTS) => {

        // Remove the modal
        removeModals()

        state.prompt = prompt;
        state.transcript = transcript.value!.transcript;
        state.currentVideoID = video_id;
        router.push('/generated');
    }

    const handlePrint = () => {
        window.print()
    }

    const handleSave = () => {
        transcriptSave.value.videoID = video_id;
        transcriptSave.value.content = transcript.value?.transcript!;

        saveDocument(transcriptSave.value, 'TRANSCRIPT')

        // Remove the modal
        removeModals()
        router.push('/profile')
    }



  </script>
  
  