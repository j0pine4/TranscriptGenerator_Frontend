<template>
                    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-flow-row auto-rows-max" >
        <profile-card v-if="!isLoadingNotes" v-for="note in notes" :document="note" @delete-doc="refetchNotes" :key="note.id"></profile-card>
        <skeleton-card v-else v-for="i in 10"></skeleton-card>
    </div>

    

</template>

<script lang="ts" setup>
    const { getUserDocuments } = useCustomFetch();

    const {data:notes, refetch:refetchNotes, isLoading: isLoadingNotes} = getUserDocuments('GENERATED', true)
</script>