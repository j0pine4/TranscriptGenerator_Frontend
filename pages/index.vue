<template>

    <div class="fixed -z-[10]">
        <img class="object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)]" src="~/assets/img/bg_dots.png" alt="">
        <img class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
        <img class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
    </div>

    <hero-section></hero-section>

    <div class="max-w-4xl mx-auto mb-12">
        <about-us></about-us>
    </div>
    
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ["is-authenticated"]
})

</script>