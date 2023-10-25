<template>
    <header class="w-full border-b border-b-white bg-black">
        <nav class="container mx-auto flex justify-between items-center text-white p-4">

            <h1> Transcript </h1>

            <div class="hidden md:flex gap-4 items-center">
                <NuxtLink class="hover:text-primary" v-for="(link, i) of navLinks" :to="link.url">{{ link.title }} <span class="ml-2 text-white"> {{ i !== navLinks.length - 1 ? '|' : '' }} </span> </NuxtLink>
            </div>

            <!-- Authenticated -->
            <div v-if="state.user" class="hidden md:flex gap-4 items-center"> 
                <div>
                    <NuxtLink to="/profile" class="flex flex-col items-center hover:text-primary">
                        <UIcon name="i-heroicons-user" class="h-6 w-6"></UIcon>
                        <p> My Profile </p>
                    </NuxtLink>
                </div>
                
                <div @click="logout()" class="flex flex-col items-center hover:text-primary cursor-pointer">
                    <UIcon name="i-heroicons-arrow-top-right-on-square" class="h-6 w-6"></UIcon>
                    <p> Logout </p>
                </div>
                
            </div>

            <!-- Not Authenticated -->
            <div v-else class="hidden md:flex gap-4 items-center"> 
                <div> <NuxtLink to="/auth/login">Login</NuxtLink> </div>
                <div>|</div>
                <div> <NuxtLink to="/auth/register">Register</NuxtLink> </div>
            </div>

            <!-- Mobile Hamburger menu -->
            <UIcon name="i-heroicons-bars-3" @click="toggleSidebar()" class="md:hidden h-8 w-8"></UIcon>

        </nav>
    </header>

    <USlideover v-model="sideBarOpen">
        <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }}">

            <template #header>
                <div class="w-full flex justify-between">
                    <h1> Transcript</h1>
                    <UIcon name="i-heroicons-x-mark" @click="toggleSidebar()" class="h-8 w-8"></UIcon>
                </div>
            </template>

            <div class="flex flex-col gap-6  mt-12">
                <NuxtLink v-for="link in navLinks" :to="link.url" class="flex items-center gap-4">
                    <UIcon :name="link.icon!" :is="link.icon" class="h-8 w-8 text-white/50"></UIcon>
                    <span> {{ link.title }} </span>
                </NuxtLink>

                <!-- Authenticated -->
                <div v-if="state.user">
                    <NuxtLink to="/profile" class="flex items-center gap-4">
                        <UIcon name="i-heroicons-user" class="h-8 w-8 text-white/50"></UIcon>
                        <span> My Profile </span>
                    </NuxtLink>
                </div>
                
                <div v-if="state.user">
                    <div @click="logout()" class="flex items-center gap-4">
                        <UIcon name="i-heroicons-arrow-top-right-on-square" class="h-8 w-8 text-white/50"></UIcon>
                        <span> Logout </span>
                    </div>
                </div>
                    

                <!-- Not Authenticated -->
                <div v-if="!state.user" class="flex gap-4 items-center"> 
                    <div> <NuxtLink to="/auth/login">Login</NuxtLink> </div>
                    <div>|</div>
                    <div> <NuxtLink to="/auth/login">Register</NuxtLink> </div>
                </div>

            </div>

        </UCard>
    </USlideover>
</template>

<script setup lang="ts">
    import { useGlobalState } from '~/stores/globalState';
    import { Link } from '~/models/links'
    const { getUserFromToken, logout } = useAuth()
    const state = useGlobalState()

    const sideBarOpen = ref(false)
    defineShortcuts({
        escape: {
            usingInput: true,
            whenever: [sideBarOpen],
            handler: () => { sideBarOpen.value = false }
        }
    })

    const navLinks = ref<Link[]>([
        {
            title: 'Generate',
            url: '/',
            icon: 'i-heroicons-academic-cap',
        },
        {
            title: 'Pricing',
            url: '/pricing',
            icon: 'i-heroicons-currency-dollar',
        },
        // {
        //     title: 'About',
        //     url: '/',
        //     icon: InformationCircleIcon,
        // },
    ])

    const toggleSidebar = () => {
        sideBarOpen.value = !sideBarOpen.value;
    }

    // <h1 v-else> {{ getUserFromToken().name }} </h1>

</script>