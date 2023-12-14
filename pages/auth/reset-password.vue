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
                <UInput v-model="password"  type="password" class="w-full" placeholder="New Password"></UInput>
                <UInput v-model="password2"  type="password" class="w-full" placeholder="Repeat New Password"></UInput>

                <p v-if="errorMSG" class="text-red-500"> {{ errorMSG }} </p>

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full" > Reset Password </button>
            </form>
            <!-- End Form -->
        </div>
    </div>

</template>

<script lang="ts" setup>
 
    const router = useRouter();
    const supabase = useSupabaseClient();

    const password = ref<string>("")
    const password2 = ref<string>("")
    const errorMSG = ref<string>("")

    
    const handleSubmit = async () => {
        errorMSG.value = ""

        if (password.value != password2.value){
            errorMSG.value = "Passwords do not match" 
            return;
        }

        await supabase.auth.updateUser({ password: password.value })

        router.push("/")
    }
</script>

