<template>
    <div class="bg-black/75 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 text-white">

        <h1 class="font-bold text-xl mb-1"> {{ props.document?.title }} </h1>
        <p class="font-light text-xs text-white/50 mb-4"> {{ parseDate(props.document?.created_on!) }} </p>

        <iframe class="w-full h-[200px] mb-4 rounded-xl" :src="'https://www.youtube.com/embed/' + props.document?.videoID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <p class="font-light mb-4"> {{ props.document?.description }} </p>
        
        <div class="flex justify-between gap-2">
            <NuxtLink to="/profile/1" class="bg-primary text-white rounded w-full p-2 text-center"> View </NuxtLink>
            <button class="border border-primary text-primary rounded w-full p-2"> Delete </button>
        </div>
        
    </div>
</template>

<script setup lang="ts">

import { Document } from 'models/document';
import { PropType } from 'nuxt/dist/app/compat/capi';

const { parseDate } = useUtils();

const props = defineProps({
    document: Object as PropType<Document>
})

</script>