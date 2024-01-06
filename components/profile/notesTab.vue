<template>
                    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-flow-row auto-rows-max" >

        <div v-if="!isLoadingNotes && notes.length == 0" class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <h4 class="text-xl sm:text-2xl lg:text-3xl lg:leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"> You have no saved AI Summaries... </h4>
        </div>

        <profile-card v-if="!isLoadingNotes" v-for="note in notes" :document="note" @delete-doc="refetchNotes" :key="note.id"></profile-card>
        <skeleton-card v-else v-for="i in 10"></skeleton-card>
    </div>

    

</template>

<script lang="ts" setup>
    const { getUserDocuments } = useCustomFetch();

    const {data:notes, refetch:refetchNotes, isLoading: isLoadingNotes} = getUserDocuments('GENERATED', true)
</script>