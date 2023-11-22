
import type { toArray } from 'gsap';

<template>
    <div class="bg-black">
        <p ref="textEl" v-for="phrase in text" :key="phrase" class="uppercase -translate-y-52 text-5xl text-white ml-20 relative opacity-100">{{ phrase }}</p>
    </div>
</template>

<script setup lang="ts">

    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    const textEl = ref();

    const text = [
        'Pull transcripts from Youtube',
        'Use AI to generate notes in seconds',
        'Ask AI direct questions about your videos',
        'Learn faster than ever',
    ]

    onMounted(() => {

        gsap.registerPlugin(ScrollTrigger);

        gsap.from(textEl.value, {
            scrollTrigger: {
                trigger: textEl.value,
                start: 'top-=500px',
                end: 'bottom+=800px bottom',
                scrub: true,
                markers: false
            },
            left: "-200px",
            opacity: 0,
            stagger: 1
        })


    })


</script>

<style>

</style>