<template>
    <div id="board" >
        <Row v-for="el, ind in guesses" :id="ind" :guess="el" :rownum="ind"/>
        
    </div>
</template>

<script setup lang="ts">
    import  { useGameStore } from "../stores/game";
    import Row from './Row.vue';
    const game = useGameStore();
    const guesses = game.$state.guesses;
</script>
<script lang="ts">
    
</script>

<style scoped>
    #board{        
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>