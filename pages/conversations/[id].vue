<template>
    <div class="container mx-auto relative">

    <background-elements></background-elements>

    <!-- Back Button -->
    <NuxtLink to="/" class="print:hidden mt-6 text-white flex gap-2 items-center justify-center w-fit"> 
        <UIcon name="i-heroicons-arrow-left" class="h-6 w-6 mb-1"></UIcon>
        Back 
    </NuxtLink>

    <div class="grid grid-cols-12 gap-6 relative">

        <div class="col-span-12 md:col-span-8 bg-black/75 py-8 px-6 lg:px-24 rounded-xl my-4 print:border-none border-2 border-dark-gray backdrop:blur-3xl">
                
            <div class="mb-6 text-center print:hidden">
                <h1 class="text-3xl sm:text-5xl lg:text-6xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> AI Powered Chat </h1>
                <p class="text-white"> Ask AI any questions you may have about this video... </p>
            </div>

            <hr class="mb-6 print:hidden">
            
            <h1 class="text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">Original Video: </h1>
            <!-- <iframe class="w-full h-[500px] mb-12 rounded-xl print:hidden" :src="'https://www.youtube.com/embed/' + video_id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
            <iframe src="https://www.youtube.com/embed/arj7oStGLkU?si=nRAoMHF-eN0zrG9U" class="w-full h-[250px] lg:h-[400px] mb-12 rounded-xl print:hidden" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            <div class="overflow-y-auto">

                <UCard v-for="message in messages" :key="message.id" class="mb-4 h-fit border border-gray-800" :style="message.role == 'user' ? userBoxStyle : ''">
                    <template #header>
                        <div class="flex gap-4 items-center">
                            <UIcon :name="message.role == 'user' ?'i-heroicons-user' : 'i-heroicons-bolt'" class="h-8 w-8 text-primary" />
                            <h1> {{ message.role == "user" ? 'User' : 'AI Response' }} </h1>
                        </div>
                    </template>

                    <div v-if="message.role != 'user'" v-html="message.content"></div>
                    <p v-else> {{ message.content }} </p>
                </UCard>

            </div>

            <div class="sticky bottom-4">

                <form class="flex justify-center items-center gap-2 w-full shadow-xl shadow-black">
                    <UInput v-model="input" color="white" type="text" class="w-full" placeholder="Ask a Question..." />
                    <UButton @click="handleSubmit" class="py-4 px-4" label="Submit" />
                </form>

            </div>
            

        </div>
        
        <sidebar></sidebar>
        
    </div>
    </div>

</template>

<script setup lang="ts">

const { getMessagesForConversation, sendNewMessage } = useCustomFetch();
const {data: messages, refetch} = getMessagesForConversation(1)

const input = ref("")

const userBoxStyle = {
    'background-color': 'black !important'
}

const handleSubmit = async () => {
    const {data, error} = await sendNewMessage(1, input.value)

    if(data.value){
        refetch()
    }
}


</script>