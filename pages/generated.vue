<template>

    <!-- Saving modal -->
    <UModal v-model="saveModal">

        <div class="col-span-3">
            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
            <iframe class="w-full h-[250px] mb-6 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + state.currentVideoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            <form @submit.prevent="handleSave()" class="flex flex-col gap-4">

                <input v-model="notesSave.title" id="notes-title" type="text" required maxlength="255" placeholder="Title" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4">

                <textarea v-model="notesSave.description" id="notes-description" placeholder="Description" maxlength="255" required class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4"></textarea>

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full"> Save </button>
            
            </form>

        </div>
    </UModal>
    
    <div class="container mx-auto relative">

        <background-elements></background-elements>

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

                    <div class="flex flex-col items-center justify-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <ClipboardDocumentIcon class="h-6 w-6  mb-1"></ClipboardDocumentIcon>
                        <p> Copy </p>
                    </div>

                    <p> · </p>

                    <div @click="handlePrint()" class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all">
                        <PrinterIcon class="h-6 w-6 mb-1"></PrinterIcon>
                        <p> Print </p>
                    </div>

                    <p> · </p>

                    <div class="flex flex-col items-center font-light cursor-pointer hover:text-primary duration-300 transition-all" data-hs-overlay="#notes-save-modal">
                        <DocumentPlusIcon class="h-6 w-6 mb-1"></DocumentPlusIcon>
                        <p> Save </p>
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
    import { ClipboardDocumentIcon, PrinterIcon, ArrowLeftIcon, AcademicCapIcon, PencilSquareIcon, DocumentPlusIcon  } from '@heroicons/vue/24/outline'
    import { API } from '~/composables/api/useAPI';
    import { useGlobalState } from '~/stores/globalState';

    const state = useGlobalState()
    const client = new API();
    const router = useRouter();
    const { removeModals } = useUtils()
    const { saveDocument } = useCustomFetch();

    const isLoading = ref<boolean>(true)
    const saveModal = ref(false)

    const notesSave = ref({
        videoID: '',
        title: '',
        description: '',
        content: '',
    })

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

    const handleSave = () => {
        notesSave.value.videoID = state.currentVideoID;
        notesSave.value.content = state.generatedNotes!;

        saveDocument(notesSave.value, 'GENERATED')

        // Remove the modal
        removeModals()
        router.push('/profile')
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
  
  