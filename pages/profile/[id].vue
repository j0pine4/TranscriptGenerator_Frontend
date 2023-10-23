<template>
    <div class="container mx-auto relative">


        <div class="fixed -z-[10] print:hidden">
            <img class="object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)]" src="~/assets/img/bg_dots.png" alt="">
            <img class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
            <img class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
        </div>

        <!-- Back Button -->
        <NuxtLink to="/profile" class="print:hidden mt-6 text-white flex gap-2 items-center justify-center w-fit"> 
            <ArrowLeftIcon class="h-6 w-6  mb-1"></ArrowLeftIcon>
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

                    <div v-if="transcript?.tokenCount! < 4000 " class="flex flex-col items-center justify-center  text-primary font-bold cursor-pointer hover:scale-105 duration-300 transition-all" data-hs-overlay="#hs-bg-gray-on-hover-cards">
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

                </div>
                

                <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
                <iframe class="w-full h-[500px] mb-12 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + document?.videoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                
                <div v-if="!error">
                    <h1  class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Transcript: </h1>
                    <div v-html="document?.content" class="text-white print:text-black leading-8">  </div>
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
    import { ClipboardDocumentIcon, PrinterIcon, ArrowLeftIcon, AcademicCapIcon, PencilSquareIcon, KeyIcon, MegaphoneIcon, QuestionMarkCircleIcon, GlobeAmericasIcon, DocumentPlusIcon  } from '@heroicons/vue/24/outline'

    definePageMeta({
        middleware: ["is-authenticated"]
    })

    const { getDocumentByID } = useCustomFetch()
    const router = useRouter();
    const route = useRoute();
    const document_id: number = Number(route.params.id);
    
    const { text, copy, copied, isSupported } = useClipboard()

    const state = useGlobalState()
    const {data: document, error} = getDocumentByID(document_id)

    // const handlePrompt = (prompt: PROMPTS) => {

    //     // Remove the modal
    //     let ModalOverlay = document.querySelector('[data-hs-overlay-backdrop-template]');
    //     ModalOverlay?.remove();

    //     // Remove the overflow hidden from body
    //     let body = document.body;
    //     body.style.overflow = 'auto'

    //     state.prompt = prompt;
    //     state.transcript = transcript.value!.transcript;
    //     router.push('/generated');
    // }

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
  
  