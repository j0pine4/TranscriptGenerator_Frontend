<template>

    <div>
        <!-- Saving modal -->
        <UModal v-model="deleteModal">

            <div class="col-span-3 text-center p-6">
                <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> This document will be DELETED </h1>
                <p class="text-white mb-6"> Are you sure you'd like to continue? </p>

                <form @submit.prevent="confirmDelete.mutate()" class="flex gap-4 max-w-sm mx-auto">
                    <button type="submit" class="border border-primary p-3 rounded-md text-primary w-full"> Delete </button>
                    <button @click="deleteModal = false" type="button" class="bg-primary p-3 rounded-md text-white w-full"> Cancel </button>
                </form>

            </div>
        </UModal>


        <UCard>
            <template #header>
                <h1 class="font-bold text-lg mb-1"> {{ props.document?.title }} </h1>
                <p class="font-light text-xs text-white/50"> {{ parseDate(props.document?.created_on!) }} </p>
            </template>

            <div class="h-full">
                <iframe class="w-full h-[200px] rounded-xl mb-1" :src="'https://www.youtube.com/embed/' + props.document?.videoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <!-- <p class="font-light"> {{ parseDescription(props.document?.description!) }} </p> -->

            <template #footer>
                <div class="flex justify-between w-full gap-2 h-full place-content-end">
                    <NuxtLink :to="`/profile/${props.document?.id}`" class="bg-primary text-white rounded w-full p-2 text-center"> View </NuxtLink>
                    <button @click="setDocument(props.document?.id!)" class="border border-primary text-primary rounded w-full p-2"> Delete </button>
                </div>
            </template>
        </UCard>
    </div>

</template>

<script setup lang="ts">

import { useMutation } from '@tanstack/vue-query';
import type { Document } from '~/models/document';

const { parseDate, parseDescription } = useUtils();
const { deleteDocument }  = useCustomFetch();
const deleteModal = ref(false)

const props = defineProps({
    document: Object as PropType<Document>
})

const documentID = ref(0)

const emits = defineEmits(['delete-doc',])

const confirmDelete = useMutation({

    mutationFn: () => deleteDocument(documentID.value),
    onSuccess: (resp) => {
        console.log(`Mutation Done`)
        emits('delete-doc');
        deleteModal.value = false;
    }
}) 

const setDocument = (id: number) => {
    deleteModal.value = true;
    documentID.value = id;
}

</script>