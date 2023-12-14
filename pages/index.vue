<template>

    <home-public v-if="!user"></home-public>
    <home-authenticated v-else></home-authenticated>
    
</template>

<script setup lang="ts">

const user = useSupabaseUser();

// definePageMeta({
//     middleware: ["is-authenticated"]
// })


</script>