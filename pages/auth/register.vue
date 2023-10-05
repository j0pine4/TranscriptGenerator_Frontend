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
            <form class="flex flex-col justify-center items-center gap-2 w-full mx-auto" @submit.prevent="handleSubmit">

                <div class="flex justify-between gap-2 w-full">
                    <input v-model="credentials.firstName" required type="text" id="firstName" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4" placeholder="First Name">
                    <input v-model="credentials.lastName" required type="text" id="lastName" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4" placeholder="Last Name">
                </div>

                <input v-model="credentials.email" required type="email" id="email" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4" placeholder="email">
                <input v-model="credentials.password" required  type="password" id="password" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4" placeholder="Password">
                <input v-model="credentials.password2" required  type="password" id="password2" class="py-3 px-4 block w-full border-transparent rounded-md text-sm focus:border-primary focus:ring-primary sm:p-4" placeholder="Re-enter Password">

                <p v-for="err in errorList" class="text-red-500"> {{ err[0] }} </p>

                <button type="submit" class="bg-primary p-3 rounded-md text-white w-full"> Register </button>
            </form>
            <!-- End Form -->

        </div>
    </div>

</template>

<script lang="ts" setup>
    import { Register } from '~/models/authentication'
 
    const { login, register } = useAuth();
    const router = useRouter();

    const credentials = ref<Register>({
        email: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
    })

    const errorList = ref<string[]>([])

    const handleSubmit = async () => {

        errorList.value = [];

        if(credentials.value.password !== credentials.value.password2){
            errorList.value.push('Passwords do not match')
            return;
        }

        const {error} =  await register(credentials.value);

        if(error.value){
            console.log(error.value.data.data)
            errorList.value = error.value.data.data;
            return;
        }

        router.push('/')

    }
</script>

