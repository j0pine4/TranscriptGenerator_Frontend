<template>
    <!-- Hero -->
    
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
                    <h1 class="text-3xl sm:text-5xl lg:text-6xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Enjoy your AI Notes </h1>
                    <p class="text-white"> Please note that this process can take a few minutes to complete... </p>
                </div>

                <hr class="mb-6 print:hidden">

                <div v-if="!isLoading" class="text-white flex gap-4 items-center mb-6 justify-center print:hidden">

                    <div class="flex flex-col items-center justify-center  text-primary font-bold cursor-pointer hover:scale-105 duration-300 transition-all" data-hs-overlay="#hs-modal-upgrade-to-pro">
                        <AcademicCapIcon class="h-6 w-6  mb-1"></AcademicCapIcon>
                        <p> Generate </p>
                    </div>

                    <p> · </p>

                    <div class="flex flex-col items-center justify-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <ClipboardDocumentIcon class="h-6 w-6  mb-1"></ClipboardDocumentIcon>
                        <p> Copy </p>
                    </div>

                    <p> · </p>

                    <div @click="handlePrint()" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <PrinterIcon class="h-6 w-6 mb-1"></PrinterIcon>
                        <p> Print </p>
                    </div>

                </div>
                
                <div v-if="isLoading">
                    <skeleton-loader></skeleton-loader>
                </div>

                <div v-else v-html="state.generatedNotes" class="text-white print:text-black leading-8"> </div>

            </div>
            
            <sidebar></sidebar>
            

        </div>
    </div>


    <!-- End Hero -->
  </template>
  
  <script setup lang="ts">
    import { ClipboardDocumentIcon, PrinterIcon, ArrowLeftIcon, AcademicCapIcon, PencilSquareIcon  } from '@heroicons/vue/24/outline'
    import { API } from '~/composables/api/useAPI';
    import { useGlobalState } from '~/stores/globalState';

    const state = useGlobalState()
    const client = new API();
    const router = useRouter();


    const isLoading = ref<boolean>(true)

    if(!state.prompt || !state.transcript){
        router.push('/');
    }

    const getData = async () => {

        if(!state.prompt || !state.transcript){
            return;
        }

        const {data, error} = await client.generate.create(state.prompt, state.transcript)

        if (data.value){
            state.generatedNotes = data.value;
            isLoading.value = false;
        }

    }

    const handlePrint = () => {
        window.print()
    }

    getData();

    
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
  
  