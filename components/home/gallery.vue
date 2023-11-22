<template>

    <div class="h-full w-full">
        <!-- <h1 class="text-9xl text-white z-40"> Gallery </h1> -->

        <section class="h-screen m-auto"></section>

        <!-- <section class="grid grid-cols-3 h-screen w-full z-[30] m-auto">
            <div class="border-r"></div>
            <div class="border-r"></div>
            <div class="border-r"></div>
        </section> -->

        <section class="h-[200vh] grid grid-cols-3 z-10 relative gap-12">
            <!-- <img ref="imageEl" v-for="image in images" :src="image" alt="" class="h-[700px] w-full object-cover relative z-10 p-12 rounded-lg"> -->
            <div ref="imageEl" v-for="image in images" class="relative bg-black/75 w-full h-[700px] rounded-xl border-2 border-dark-gray backdrop:blur-3xl p-4 flex flex-col justify-center items-center text-center">
            
                <div class="before:content-[''] before:bg-gradient-to-b from-black/50 to-black before:h-20 before:w-20 before:absolute before:left-0  absolute top-2">
                    <UIcon name="i-heroicons-academic-cap" class="h-20 w-20 text-primary/50"></UIcon>
                </div>

                <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-6 mb-2 z-10"> Take Notes </h1>
                <p class="text-white/50 text-xs tracking-wider"> Create automatic notes based on the transcript using AI </p>
            </div>
        </section>

    </div>

</template>

<script setup lang="ts">

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'

const { x, y } = useWindowScroll({behavior: 'smooth'})

const images = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=1526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const imageEl = ref()


onMounted(() => {

    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
        console.log(e)
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: imageEl.value,
            scrub: true,
        }
    })
    .to(imageEl.value, {
        stagger: .2,
        y: -700,
    })
    
})

</script>

<style scoped>
    h1 { 
        font-size: 14rem; 
        font-family: 'Bebas Neue';
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
    }
</style>
