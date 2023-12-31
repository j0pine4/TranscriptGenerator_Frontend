<template>

    <UModal v-model="generateModal" :ui="modalStyles">

    <div class="flex justify-between items-start py-3 px-4 border-b ">
        <h4 class="text-xl sm:text-2xl lg:text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 max-w-3xl"> Generate notes with AI </h4>
        <button type="button" @click="generateModal = false" class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm ">
            <span class="sr-only">Close</span>
            <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
            </svg>
        </button>
    </div>


    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 p-4">

        <!-- Card -->
        <div @click="handlePrompt(PROMPTS.NOTES)" class="cursor-pointer bg-white/5 p-4 transition duration-300 rounded-md hover:bg-white/10">
            <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-l-xl">
                    <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 text-primary"></UIcon>
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
                    <UIcon name="i-heroicons-key" class="w-5 h-5 text-primary"></UIcon>
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
                    <UIcon name="i-heroicons-megaphone" class="w-5 h-5 text-primary"></UIcon>
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
                    <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5 text-primary"></UIcon> 
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
                    <UIcon name="i-heroicons-globe-americas" class="w-5 h-5 text-primary"></UIcon> 
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

    </div>

    </UModal>


    <div class="container mx-auto relative">

        <background-elements></background-elements>

        <!-- Back Button -->
        <NuxtLink to="/profile" class="print:hidden mt-6 text-white flex gap-2 items-center justify-center w-fit"> 
            <UIcon name="i-heroicons-arrow-left" class="h-6 w-6 mb-1"></UIcon>
            Back 
        </NuxtLink>
        
        <div class="grid grid-cols-12 gap-6 relative">

            <div class="col-span-12 md:col-span-8 bg-black/75 py-8 px-6 lg:px-24 rounded-xl my-4 print:border-none border-2 border-dark-gray backdrop:blur-3xl">
                    
                <div class="mb-6 text-center print:hidden">
                    <h1 class="text-3xl sm:text-5xl lg:text-6xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Enjoy your Transcript </h1>
                    <p class="text-white"> You can print or copy this document </p>
                </div>

                <hr class="mb-6 print:hidden">

                <div class="text-white flex gap-4 items-center mb-6 justify-center print:hidden">

                    <div v-if="document?.content && document!.content!.length < 4000 && document!.type == 'TRANSCRIPT'"  @click="generateModal = true" class="flex flex-col items-center justify-center  text-primary font-bold cursor-pointer hover:scale-105 duration-300 transition-all">
                        <UIcon name="i-heroicons-academic-cap" class="h-6 w-6 mb-1"></UIcon>
                        <p> Generate </p>
                    </div>

                    <div v-else>
                        <UTooltip text="Length Limit: please upgrade subscription to view">
                            <div class="flex-col items-center justify-center inline-flex rounded-full text-white/25">
                                <UIcon name="i-heroicons-academic-cap" class="h-6 w-6  mb-1"></UIcon>
                                <p> Generate </p>
                            </div>
                        </UTooltip>
                    </div>

                    <p> · </p>

                    <div class="flex flex-col items-center justify-center font-light cursor-pointer hover:text-primary duration-300 transition-all" @click='copy(document?.content!)'>
                        <UIcon name="i-heroicons-clipboard" class="h-6 w-6 mb-1"></UIcon>
                        <p> Copy </p>
                    </div>

                    <p> · </p>

                    <div @click="handlePrint()" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <UIcon name="i-heroicons-printer" class="h-6 w-6 mb-1"></UIcon>
                        <p> Print </p>
                    </div>

                </div>
                

                <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
                <iframe class="w-full h-[250px] lg:h-[500px] mb-12 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + document?.videoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                
                <div v-if="isLoading">
                    <skeleton-loader></skeleton-loader>
                </div>
                
                <div v-if="document && !error">
                    <h1  class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Transcript: </h1>
                    <div v-html="document!.content" class="text-white print:text-black leading-8">  </div>
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

    definePageMeta({
        middleware: ["auth"]
    })

    const { getDocumentByID } = useCustomFetch()
    const router = useRouter();
    const route = useRoute();
    const document_id: number = Number(route.params.id);
    const generateModal = ref(false)
    
    const { text, copy, copied, isSupported } = useClipboard()

    const state = useGlobalState()
    const {data: document, error, isLoading} = getDocumentByID(document_id)

    const modalStyles = {
        "width": "sm:max-w-5xl",
    }

    const handlePrompt = (prompt: PROMPTS) => {

        state.prompt = prompt;
        state.transcript = document.value!.content;
        router.push('/generated');
    }

    const handlePrint = () => {
        window.print()
    }

  </script>

    <style>

    h1{
        font-size: 24px;
        font-weight: bold;
    }

    h2{
        font-size: 20px;
        font-weight: bold;
    }

    ul{
        list-style: disc;
        margin-left: 50px;
    }

    pre{
        background-color: black;
        padding: 10px;
        border-radius: 10px;
    }

    </style>
  
  