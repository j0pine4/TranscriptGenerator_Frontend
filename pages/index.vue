<template>

    <home-public v-if="!state.user"></home-public>
    <home-authenticated v-else></home-authenticated>
    
</template>

<script setup lang="ts">
import { useGlobalState } from '~/stores/globalState';

const state = useGlobalState();

definePageMeta({
    middleware: ["is-authenticated"]
})


</script>