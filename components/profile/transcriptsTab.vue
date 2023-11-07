<template>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-flow-row auto-rows-max" >

        <profile-card v-if="!isLoadingTranscripts" v-for="transcript in transcripts" :document="transcript" @delete-doc="refetchTranscripts" :key="transcript.id"></profile-card>
        <skeleton-card v-else v-for="i in 10"></skeleton-card>

        <div v-if="!isLoadingTranscripts && transcripts.length == 0" class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <h4 class="text-xl sm:text-2xl lg:text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> You have no saved transcripts... </h4>
        </div>

    </div>

</template>

<script lang="ts" setup>
    const { getUserDocuments } = useCustomFetch();
    const {data:transcripts, refetch:refetchTranscripts, isLoading: isLoadingTranscripts} = getUserDocuments('TRANSCRIPT', true)
</script>