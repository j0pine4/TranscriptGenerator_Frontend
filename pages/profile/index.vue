<template>

    <background-elements></background-elements>

    <div>
        <div class="container mx-auto relative my-12 px-2">

            <profile-user-card></profile-user-card>

            <!-- <UTabs :items="items" orientation="vertical" :ui="{ wrapper: 'flex items-center gap-4', list: { width: 'w-48' } }" /> -->
            <UTabs :items="tabs" class="mx-auto">
                <template #item="{ item }">

                    <div class="mt-3 mx-auto">
                        <profile-transcripts-tab ref="transcriptsTab" v-if="item.key == 'transcripts'"></profile-transcripts-tab>
                        <profile-notes-tab ref="notesTab" v-if="item.key == 'notes'"></profile-notes-tab>
                    </div>

                </template>
            </UTabs>

        </div>

    </div>

</template>

<script lang="ts" setup>

// definePageMeta({
//     middleware: ["is-authenticated"]
// })

const tabs = [
    {
        label: 'Transcripts',
        key: 'transcripts',
    },
    {
        label: 'AI Summaries',
        key: 'notes',
    },
]

 
</script>

