<template>
    
    <div class="grid grid-cols-4 col-span-12 md:col-span-4 h-fit gap-2 mt-4"> 

        <h1 class="text-white font-bold text-xl tracking-wider col-span-4"> What else can I do? </h1>

        <div class="relative bg-black/75 w-full h-[200px] col-span-2 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 flex flex-col justify-center items-center text-center">
            
            <div class="before:content-[''] before:bg-gradient-to-b from-black/50 to-black before:h-20 before:w-20 before:absolute before:left-0  absolute top-2">
                <AcademicCapIcon class="h-20 w-20 text-primary/50"></AcademicCapIcon>
            </div>

            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-6 mb-2 z-10"> Take Notes </h1>
            <p class="text-white/50 text-xs tracking-wider"> Create automatic notes based on the transcript using AI </p>
        </div>

        <div class="relative bg-black/75 w-full h-[200px] col-span-2 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 flex flex-col justify-center items-center text-center">
            
            <div class="before:content-[''] before:bg-gradient-to-b from-black/50 to-black before:h-20 before:w-20 before:absolute before:left-0 absolute top-2">
                <ShoppingCartIcon class="h-20 w-20 text-teal-500/50"></ShoppingCartIcon>
            </div>

            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-secondary mt-6 mb-2 z-10"> Find New Recipes </h1>
            <p class="text-white/50 text-xs tracking-wider"> Grab recipes from videos and give them a try! </p>

        </div>

        <div class="relative bg-black/75 w-full h-[200px] col-span-4 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 flex flex-col justify-center items-center text-center">
            
            <div class="before:content-[''] before:bg-gradient-to-b from-black/50 to-black before:h-20 before:w-20 before:absolute before:left-0 absolute top-2">
                <VariableIcon class="h-20 w-20 text-purple-500/50"></VariableIcon>
            </div>

            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800 mt-6 mb-2 z-10"> Apply what you learn </h1>
            <p class="text-white/50 text-xs tracking-wider"> Use AI to apply what you learn to actual situations in the real world </p>

        </div>

        <div class="relative bg-black/75 w-full h-[200px] col-span-2 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 flex flex-col justify-center items-center text-center">
            
            <div class="before:content-[''] before:bg-gradient-to-b from-black/50 to-black before:h-20 before:w-20 before:absolute before:left-0 absolute top-2">
                <ShoppingCartIcon class="h-20 w-20 text-amber-500/50"></ShoppingCartIcon>
            </div>

            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-800 mt-6 mb-2 z-10"> Get Fit </h1>
            <p class="text-white/50 text-xs tracking-wider"> Build workouts from videos you find or vlogs from popular fitness youtubers </p>

        </div>

        <div class="relative bg-black/75 w-full h-[200px] col-span-2 rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 flex flex-col justify-center items-center text-center">
            
            <div class="before:content-[''] before:bg-gradient-to-b from-black/50 to-black before:h-20 before:w-20 before:absolute before:left-0 absolute top-2">
                <MegaphoneIcon class="h-20 w-20 text-green-500/50"></MegaphoneIcon>
            </div>

            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-800 mt-6 mb-2 z-10"> Summarize a Talk </h1>
            <p class="text-white/50 text-xs tracking-wider"> Create interesting discussion prompts or notes </p>

        </div>

    </div>

</template>

<script setup lang="ts">
    import { AcademicCapIcon, ShoppingCartIcon, VariableIcon, MegaphoneIcon } from '@heroicons/vue/24/outline'
</script>
