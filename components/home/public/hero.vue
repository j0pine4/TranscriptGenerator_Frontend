<template>
    <h1 class="text-6xl text-center tracking-wide font-bold mb-16"> The best way to learn with Youtube </h1>
    <img class="h-[40vh] w-full object-cover mb-8" src="https://images.unsplash.com/photo-1600195077909-46e573870d99?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">

    <div class="flex gap-4 mb-48 justify-center">
        <NuxtLink to="/auth/login"><UButton variant="outline" size="xl"> Login </UButton></NuxtLink>
        <NuxtLink to="/auth/register"><UButton size="xl"> Try for Free </UButton></NuxtLink>
    </div>

</template>

<script setup lang="ts">

</script>