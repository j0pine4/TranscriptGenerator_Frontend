<template>

    <div class="relative overflow-x-clip z-10">

        <div class="fixed -z-[10]">
            <img class="object-cover -top-20 w-screen h-[calc(100vh+162px)] md:h-[calc(100vh+120px)]" src="~/assets/img/bg_dots.png" alt="">
            <img class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
            <img class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 unselectable w-[1600px] h-[1600px]" src="~/assets/img/sphere.svg" alt="">
        </div>


        <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8 my-20 lg:py-36 rounded">

            <h1 class="text-3xl sm:text-5xl lg:text-7xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-center mb-4"> Login </h1> 

            <!-- Form -->
            <form class="flex flex-col justify-center items-center gap-2 w-full mx-auto mb-4" @submit.prevent="handleSubmit">
                <UInput v-model="email" type="text" id="hs-hero-name-1" class="w-full" placeholder="email"></UInput>
                <UInput v-model="password"  type="password" id="hs-hero-name-1" class="w-full" placeholder="Password"></UInput>

                <p v-if="errorMSG" class="text-red-500"> {{ errorMSG }} </p>

                <NuxtLink class="text-primary font-bold" to="/auth/forgot-password">Forgot Password?</NuxtLink> 

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full"> Login </button>
            </form>
            <!-- End Form -->

            <p> Need an account? <NuxtLink class="text-primary font-bold" to="/auth/forgot-password">Register</NuxtLink> </p>

        </div>
    </div>

</template>

<script lang="ts" setup>
 
    const router = useRouter();
    const supabase = useSupabaseClient();

    const email = ref<string>("")
    const password = ref<string>("")
    const errorMSG = ref<string>("")

    const handleSubmit = async () => {

        errorMSG.value = "";

        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })

        if(error){
            errorMSG.value = error.message
            return
        }
        
        router.push("/")
    }
</script>

