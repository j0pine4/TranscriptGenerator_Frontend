<template>
    <div class="h-screen w-full bg-black overflow-hidden -mt-8">

        <div ref="heroEl" class="flex flex-col justify-center items-center relative h-screen">

            <h1 ref="headline" class="text-[100px] text-white absolute z-10"> A better way to learn </h1>
            <h1 ref="description" class="ml-20 text-[50px] text-white absolute z-10 opacity-10"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis perspiciatis ipsum reiciendis amet omnis delectus qui necessitatibus eaque accusantium? Nemo voluptas optio esse? Quod, similique! </h1>
            <UIcon name="i-heroicons-arrow-down" class="text-white z-10" />

            <img ref="backgroundImage" class="w-full mx-auto object-cover brightness-50 rounded-lg" src="https://images.unsplash.com/photo-1600195077909-46e573870d99?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        
        </div>
    </div>
    <home-description></home-description>
</template>

<script setup lang="ts">

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'

const headline = ref();
const description = ref();
const backgroundImage = ref();
const heroEl = ref();

onMounted(() => {

    const lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.registerPlugin(ScrollTrigger); 

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: document.documentElement,
            start: 'top',
            end: '+=1000px', 
            scrub: true,
            markers: false
        }
    })

    timeline
        .from(backgroundImage.value, {clipPath: "inset(20%)", filter: 'brightness(75%) blur(0px)',})
        .to(headline.value, {translateY: '-500px', scale: 2, opacity: .25 }, 0)
        .to(description.value, {opacity: 2}, 0)
})

</script>

<style>

</style>