<template>

    <slot>
        <!-- Saving modal -->
        <generate-modal id="delete-document-modal" header="Delete" >

            <div class="col-span-3 text-center">
                <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> This document {{ documentID }} will be DELETED </h1>
                <p class="text-white mb-6"> Are you sure you'd like to continue? </p>

                <form @submit.prevent="confirmDelete()" class="flex gap-4 max-w-sm mx-auto">

                    <button type="submit" data-hs-overlay="#delete-document-modal" class="border border-primary p-3 rounded-md text-primary w-full"> Delete </button>
                    <button type="button" data-hs-overlay="#delete-document-modal" class="bg-primary p-3 rounded-md text-white w-full"> Cancel </button>
                
                </form>

            </div>
        </generate-modal>


        <div class="bg-black/75 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 text-white h-full flex flex-col justify-between">

            <h1 class="font-bold text-xl mb-1"> {{ props.document?.id! }} {{ props.document?.title }} </h1>
            <p class="font-light text-xs text-white/50 mb-4"> {{ parseDate(props.document?.created_on!) }} </p>

            <div class="h-full">
                <iframe class="w-full h-[200px] mb-4 rounded-xl" :src="'https://www.youtube.com/embed/' + props.document?.videoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <p class="font-light mb-4"> {{ props.document?.description }} </p>
            
            <div class="flex justify-between w-full gap-2 justify-self-end">
                <NuxtLink :to="`/profile/${props.document?.id}`" class="bg-primary text-white rounded w-full p-2 text-center"> View </NuxtLink>
                <button @click="setDocument(props.document?.id!)" data-hs-overlay="#delete-document-modal" class="border border-primary text-primary rounded w-full p-2"> Delete </button>
            </div>
            
        </div>
    </slot>
</template>

<script setup lang="ts">

import { Document } from 'models/document';
import { PropType } from 'nuxt/dist/app/compat/capi';

const { parseDate, removeModals } = useUtils();
const { deleteDocument }  = useCustomFetch();

const props = defineProps({
    document: Object as PropType<Document>
})

const documentID = ref(0)

const emit = defineEmits(['deleteDoc'])

const confirmDelete = async () => {
    // await deleteDocument(props.document?.id!);

    console.log(`Document ${documentID.value} deleted`)

    emit('deleteDoc');
    console.log("Event emmited")

    removeModals();
    console.log("Modal removed")
}

const setDocument = (id: number) => {
    console.log(`Document ID: ${id}`)
    documentID.value = id;
}

</script>