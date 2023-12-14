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
                    <h1 class="text-3xl sm:text-5xl lg:text-6xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> Realtime Testing </h1>
                </div>

                <hr class="mb-6 print:hidden">

                <div class="text-white flex flex-col gap-4 items-center mb-6 justify-center print:hidden">

                    <UCard v-for="item in data">
                        <p> {{ item.body }} </p>
                    </UCard>

                </div>
            
            
        </div>
    </div>

    </div>

    <!-- End Hero -->
  </template>
  
  <script setup lang="ts">

    import type { RealtimeChannel } from '@supabase/supabase-js'

    const user = useSupabaseUser()
    const client = useSupabaseClient()

    let realtimeChannel: RealtimeChannel

    // Fetch collaborators and get the refresh method provided by useAsyncData
    const { data, refresh } = await useAsyncData('messagetest', async () => {

    const { data } = await client.from('transcripts_messagetest').select('body').filter('supabaseID', 'eq', user.value?.id)
        return data
    })

    // Once page is mounted, listen to changes on the table and refresh when receiving event
    onMounted(() => {

    // Real time listener 
    realtimeChannel = client.channel('public:transcripts_messagetest').on(
        'postgres_changes',
        { 
            event: '*', 
            schema: 'public', 
            table: 'transcripts_messagetest',
            filter: `supabaseID=eq.${user.value?.id}`,
         },
        () => refresh()
    )

    realtimeChannel.subscribe()
    })

    // Don't forget to unsubscribe when user left the page
    onUnmounted(() => {
    client.removeChannel(realtimeChannel)
    })


  </script>
  
  