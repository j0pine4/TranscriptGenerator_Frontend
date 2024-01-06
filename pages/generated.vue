<template>

    <!-- Saving modal -->
    <UModal v-model="saveNotesModal">

        <div class="p-6">
            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
            <iframe class="w-full h-[250px] mb-6 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + state.currentVideoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            <form @submit.prevent="handleSave()" class="flex flex-col gap-4">

                <UInput v-model="notesSave.title" id="notes-title" type="text" required maxlength="255" :disabled="submitted" placeholder="Title"></UInput>

                <!-- <UTextarea v-model="notesSave.description" id="notes-description" placeholder="Description" :disabled="submitted" maxlength="255" required></UTextarea> -->

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full" :disabled="submitted"> Save </button>
            
            </form>

        </div>
    </UModal>
    
    <div class="container mx-auto relative">

        <background-elements></background-elements>

        <!-- Back Button -->
        <NuxtLink to="/" class="print:hidden mt-6 text-white flex gap-2 items-center justify-center w-fit"> 
            <UIcon name="i-heroicons-arrow-left" class="h-6 w-6 mb-1"></UIcon>
            Back 
        </NuxtLink>
        
        <div class="grid grid-cols-12 gap-6 relative">

            <div class="col-span-12 md:col-span-8 bg-black/75 py-8 px-6 lg:px-24 rounded-xl my-4 print:border-none border-2 border-dark-gray backdrop:blur-3xl">
                    
                <div class="mb-6 text-center print:hidden">
                    <h1 class="text-3xl sm:text-5xl lg:text-6xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Enjoy your AI Notes </h1>
                    <p class="text-white"> Please note that this process can take a few minutes to complete... </p>
                </div>

                <hr class="mb-6 print:hidden">

                <div v-if="generateMutation.status.value != 'loading'" class="text-white flex gap-4 items-center mb-6 justify-center print:hidden">

                    <div class="flex flex-col items-center justify-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <UIcon name="i-heroicons-clipboard" class="h-6 w-6 mb-1"></UIcon>
                        <p> Copy </p>
                    </div>

                    <p> · </p>

                    <div @click="handlePrint()" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <UIcon name="i-heroicons-printer" class="h-6 w-6 mb-1"></UIcon>
                        <p> Print </p>
                    </div>

                    <p> · </p>

                    <div @click="saveNotesModal = true" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <UIcon name="i-heroicons-document-plus" class="h-6 w-6 mb-1"></UIcon>
                        <p> Save </p>
                    </div>

                </div>
                
                <div v-if="generateMutation.status.value == 'loading'">
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
    import { useMutation } from '@tanstack/vue-query';
    import { useGlobalState } from '~/stores/globalState';

    definePageMeta({
        middleware: ["auth"]
    })

    const state = useGlobalState()
    const router = useRouter();
    const { saveDocument, generateNotes } = useCustomFetch();

    const saveNotesModal = ref(false)
    const submitted = ref(false)

    const notesSave = ref({
        videoID: '',
        title: '',
        description: '',
        content: '',
    })

    if(!state.prompt || !state.transcript){
        router.push('/');
    }

    // Create Mutations
    const generateMutation = generateNotes(state.prompt!, state.transcript, state.transcript_token_amount);
    const saveDocMutation = useMutation({
        mutationFn: () => saveDocument(notesSave.value, 'GENERATED'),
        onSuccess: (resp) => {
            console.log(`Mutation Done`)
            router.push('/profile')
        }
    }) 

    const handlePrint = () => {
        window.print()
    }
    
    
    const handleSave = () => {
        notesSave.value.videoID = state.currentVideoID;
        notesSave.value.content = state.generatedNotes!;
        submitted.value = true;
        saveDocMutation.mutate();
    }
    
    // Generate Doc on page load
    generateMutation.mutate();
    
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
  
  