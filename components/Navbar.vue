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
                        <UserIcon class="h-6 w-6"></UserIcon>
                        <p> My Profile </p>
                    </NuxtLink>
                </div>
                
                <div @click="logout()" class="flex flex-col items-center hover:text-primary cursor-pointer">
                    <ArrowTopRightOnSquareIcon class="h-6 w-6"></ArrowTopRightOnSquareIcon>
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
            <Bars3Icon @click="toggleSidebar()" class="md:hidden h-8 w-8"></Bars3Icon>

        </nav>
    </header>

    <div class="md:hidden h-screen w-screen absolute top-0 left-0 bg-black/80 backdrop:blur-md text-white z-[100] transition-all duration-300" :class="sideBarOpen ? '' : '-translate-x-[1000px]'">
        <div class="bg-black border-r border-r-white h-screen w-80 p-4">
            <div class="w-full flex justify-between mb-12">
                <h1> Transcript</h1>
                <XMarkIcon @click="toggleSidebar()" class="h-8 w-8"></XMarkIcon>
            </div>

            <div class="flex flex-col gap-6 mb-6">

                <NuxtLink v-for="link in navLinks" :to="link.url" class="flex items-center gap-4">
                    <component :is="link.icon" class="h-8 w-8 text-white/50"></component>
                    <span> {{ link.title }} </span>
                </NuxtLink>
            </div>

            <hr class="mb-6 bg-white/25 text-white/25 h-[1px] border-none">

            <!-- Authenticated -->
            <div v-if="state.user"> 
                <div class="mb-4">
                    <NuxtLink to="/profile" class="flex items-center gap-4">
                        <UserIcon class="h-8 w-8 text-white/50"></UserIcon>
                        <span> My Profile </span>
                    </NuxtLink>
                </div>
                
                <div>
                    <div @click="logout()" class="flex items-center gap-4">
                        <ArrowTopRightOnSquareIcon class="h-8 w-8 text-white/50"></ArrowTopRightOnSquareIcon>
                        <span> Logout </span>
                    </div>
                </div>
                
            </div>

            <!-- Not Authenticated -->
            <div v-else class="flex gap-4 items-center"> 
                <div> <NuxtLink to="/auth/login">Login</NuxtLink> </div>
                <div>|</div>
                <div> <NuxtLink to="/auth/login">Register</NuxtLink> </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
    import { useGlobalState } from '~/stores/globalState';
    import { Link } from '~/models/links'
    import { UserIcon, ArrowTopRightOnSquareIcon, Bars3Icon, XMarkIcon, AcademicCapIcon, CurrencyDollarIcon, InformationCircleIcon  } from '@heroicons/vue/24/outline'

    const { getUserFromToken, logout } = useAuth()
    const state = useGlobalState()

    const sideBarOpen = ref(false)
    const navLinks = ref<Link[]>([
        {
            title: 'Generate',
            url: '/',
            icon: AcademicCapIcon,
        },
        {
            title: 'Pricing',
            url: '/pricing',
            icon: CurrencyDollarIcon,
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