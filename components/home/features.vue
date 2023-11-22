<template>
    <div class="bg-black h-full w-full flex flex-col text-white p-20">
        <div class="flex h-[600px] gap-8 w-full justify-between">
            <div ref="imageContainer" class="relative h-full w-[30%]">
                <img :src="selectedProject.src" alt="" class="object-cover h-full w-full rounded-lg">
            </div>
            <div class="column">
                <p> Nuxt is a free and open-source framework with an intuitive and extendable way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js. </p>
            </div>
            <div class="column items-end font-light">
                <p> Build more, build faster. All without the odd bugs and CLI commands. With the wide ecosystem of Vue 3, Nuxt 3 and vanilla javascript plugins work without issue. </p>
            </div>
        </div>

        <!-- Projects container -->
        <div ref="projectsEl" class="mt-[200px]">
            <div v-for="feature in features" :key="feature.title" @mouseenter="selectedProject = feature">
                <p class="flex justify-end border-t text-6xl py-6 mt-7 font-bold"> {{ feature.title }} </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const imageContainer = ref()
const projectsEl = ref()

const features = [
    {
        title: 'Ask Questions on Lectures',
        src: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: 'Pull Workouts from Vlogs',
        src: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1594&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: 'Find New Recipes',
        src: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: 'Get Talking Points from Podcasts',
        src: 'https://images.unsplash.com/photo-1487537023671-8dce1a785863?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
]

const selectedProject = ref<any>(features[0])

onMounted(() => {

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: imageContainer.value,
        start: "-=100px",
        end: projectsEl.value.offsetheight,
        markers: false,
        pin: true
    })


})

</script>

<style scoped>
    .column{
        @apply
        flex
        w-1/4
        text-xl
        h-full
    }
</style>