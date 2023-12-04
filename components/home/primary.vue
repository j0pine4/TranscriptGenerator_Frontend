<template>
    <div ref="heroEl" class="h-screen my-8">
        <div class="container mx-auto">
            <div class="hero-inner flex items-center justify-between my-6 h-screen">
                <div class="hero-content w-1/2">
                    <div ref="content" class="hero-content-inner w-96 mx-auto">
                        <h1 class="font-bold text-3xl mb-6 text-left">

                            <div class="h-16 text-6xl overflow-hidden">
                                <div class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Transcripts</div>
                            </div>

                            <div class="hero-content-line h-11 overflow-hidden">
                                <div class="hero-content-line-inner">Elevate your learning</div>
                            </div>
                            <div class="hero-content-line h-11 overflow-hidden">
                                <div class="hero-content-line-inner">with intelligent and</div>
                            </div>
                            <div class="hero-content-line h-11 overflow-hidden">
                                <div class="hero-content-line-inner">captivating summaries.</div>
                            </div>
                        </h1>
                        <p class="text-sm leading-6 mb-14">Elevate learning effortlessly with our platform, providing intelligent and captivating summaries of videos, unlocking knowledge seamlessly for ultimate comprehension.</p>
                        <div class="button-row relative flex gap-4">
                            <UButton size="xl" color="primary" icon="i-heroicons-user-circle-solid" :trailing="false" class="uppercase"> Register </UButton>
                            <UButton size="xl" variant="ghost" color="gray" class="uppercase"> Login </UButton>
                        </div>
                    </div>
                </div>
                <div class="hero-images w-1/2 h-screen relative">
                    <div ref="imagesEl">
                        <div ref="secondaryImageEl" class="hero-image 01 absolute overflow-hidden top-0 right-0 w-[45%] h-1/2">
                            <img class="absolute inset-0 w-full" :src="images[0]" alt="Image">
                        </div>
                        <div ref="mainImageEl" class="hero-image 02 absolute overflow-hidden bottom-6 left-0 w-[52%] h-[65%]">
                            <img class="absolute inset-0 w-full" :src="images[1]" alt="Image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import gsap from 'gsap';

    const images = [
        "https://images.unsplash.com/photo-1526657782461-9fe13402a841?q=80&w=1592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1611348586758-9475c1158ede?q=80&w=1582&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]

    // Dom elements
    const heroEl = ref()
    const imagesEl = ref()
    const mainImageEl = ref()
    const secondaryImageEl = ref()
    const content = ref()

    onMounted( () => {

        // Content variables
        const headline = content.value.children[0].children[0];
        const headlineFirst = headline.nextSibling;
        const headlineSecond = headlineFirst.nextSibling;
        const headlineThird = headlineSecond.nextSibling;
        const contentP = content.value.children[1];
        const contentButtons = content.value.children[2];

        gsap.to(heroEl.value, {duration: 0, visibility: 'visible'});

        // Images animation
        const tl = gsap.timeline({delay: 0.3})
            .from(secondaryImageEl.value, {duration: 1.2, y: 1280, ease: 'power3.out'})
            .from(secondaryImageEl.value.firstElementChild, { scale: 1.6, duration: 2, ease: 'power3.out'}, 0.2)
            .from(mainImageEl.value, {duration: 1.2, y: 1280, ease: 'power3.out'}, 0.2)
            .from(mainImageEl.value.firstElementChild, { scale: 1.6, duration: 2, ease: 'power3.out'}, 0.2)

        // Content animation
        tl
            .from([headline.children, headlineFirst.children, headlineSecond.children, headlineThird.children], { y: 65, duration: 1, ease:  'power3.out', delay: 0.3, stagger: 0.15}, 0)
            .from(contentP, {y: 20, opacity: 0, ease: 'power3.out'}, 1)
            .from(contentButtons, {y: 20, opacity: 0, ease: 'power3.out', delay: 0.3}, 1)
    })

</script>