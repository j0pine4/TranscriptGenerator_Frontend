<template>

    <div class="relative overflow-x-clip z-10">

        <div class="fixed -z-[10]">
            <img class="object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)]" src="~/assets/img/bg_dots.png" alt="">
            <img class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
            <img class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
        </div>

        <div class="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 my-20 lg:py-36 rounded">

            <h1 class="text-3xl sm:text-5xl lg:text-7xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-center mb-4"> Register </h1> 

            <!-- Form -->
            <form class="flex flex-col justify-center items-center gap-2 w-full mx-auto mb-4" @submit.prevent="handleSubmit">

                <div class="flex justify-between gap-2 w-full">
                    <UInput :required="true" v-model="credentials.firstName" type="text" class="w-full" placeholder="First Name"></UInput>
                    <UInput :required="true" v-model="credentials.lastName" type="text" class="w-full" placeholder="Last Name"></UInput>
                </div>

                <UInput :required="true" v-model="credentials.email" type="email" class="w-full" placeholder="Email"></UInput>
                <UInput :required="true" v-model="credentials.password" type="password" class="w-full" placeholder="Password"></UInput>
                <UInput :required="true" v-model="credentials.password2" type="password" class="w-full" placeholder="Re-enter Password"></UInput>

                <p class="text-red-500"> {{ errorMSG }} </p>

                <p class="mb-4"> You will recieve an email to verify your account after registration. </p>

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full"> Register </button>
            </form>
            <!-- End Form -->

            <p> Already have an account? <NuxtLink class="text-primary font-bold " to="/auth/login">Login</NuxtLink> </p>

        </div>
    </div>

</template>

<script lang="ts" setup>
    import { Register } from '~/models/authentication'
 
    const router = useRouter();
    const supabase = useSupabaseClient()

    const credentials = ref<Register>({
        email: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
    })

    const errorMSG = ref<string>()

    const handleSubmit = async () => {

        if(credentials.value.password !== credentials.value.password2){
            errorMSG.value ='Passwords do not match'
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: credentials.value.email,
            password: credentials.value.password,
            options: {
                data: {
                    firstName: credentials.value.firstName,
                    lastName: credentials.value.lastName,
                }
            }
        })

        if(error){
            errorMSG.value = error.message;
            return;
        } 
        
        router.push('/auth/success')
    }
</script>

