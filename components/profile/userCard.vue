<template>

    <div class="flex justify-between items-center text-white mb-6">

        <h1 v-if="user" class="font-bold text-2xl mb-1"> Welcome {{ user.user_metadata['firstName'] }} {{ user.user_metadata['lastName'] }} </h1>

        <button class="border border-primary text-primary rounded w-full p-2 max-w-[300px]"> Update Subscription </button>

    </div>

    <hr class="mb-6 bg-white/25 text-white/25 h-[1px] border-none">

</template>

<script setup lang="ts">

const user = useSupabaseUser();


</script>