<template>
    <div class="tile grey">
        {{ letter.letter.toUpperCase() }}
    </div>
</template>

<script setup lang="ts">
    import { ColoredLetter } from '../stores/game';
    const props = defineProps<{
        letter: ColoredLetter,
        row:number,
        col:number
    }>()
</script>

<style scoped>
    .tile{
        border: 1px solid rgb(170, 170, 180);
        min-width: 4rem;
        min-height: 4rem;
        margin: 0.2em;
        display: flex;
        align-items: center;        
        justify-content: center;
        color: white;
        font-size: 2em;
    }
    .grey{
        background-color: rgb(35, 32, 32);
    }
</style>