<template>
    
    <!-- Bg Elements -->
    <div class="relative overflow-x-clip z-10">

        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-36">
            <div class="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
            <!-- Title -->
            <div class="text-center">
                <h1 class="text-3xl font-light text-white sm:text-5xl lg:text-7xl lg:leading-tight">
                    <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Get Transcripts </span> 
                    with the</h1> 
                <h1 class="text-3xl font-light text-white sm:text-5xl lg:text-6xl lg:leading-tight mb-4">Click of a button...</h1> 
                <p class="text-light-gray tracking-wide mb-3">Automatically generate notes and Elevate Your Learning Journey.</p>
            </div>
            <!-- End Title -->

            <!-- Form -->
            <form class="flex justify-center items-center gap-2 w-full max-w-[40rem] mx-auto" @submit.prevent="handleSubmit()">
                <UInput :required="true" v-model="input" color="white" type="text" class="w-full" placeholder="Paste Youtube Link..." />
                <button type="submit" class="bg-primary px-3 rounded-md h-full text-white md:w-60"> Submit </button>
            </form>
            <!-- End Form -->

            </div>
        </div>
    </div>

    <!-- End Hero -->
  </template>
  
  <script setup lang="ts">
    import { useUtils } from '../composables/utils';

    const { videoIdParse } = useUtils();
    const input = ref("");
    const router = useRouter();
    
    const handleSubmit = () => {
        let video_id = videoIdParse(input.value);

        router.push(`transcripts/${video_id}`)
    }
    
  </script>
  
  