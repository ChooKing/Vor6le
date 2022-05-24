<template>
    <div id="board" >
        <Finish v-if="game.ending!=Endings.Playing"/>
        <Row v-for="el, ind in guesses" :id="ind" :rownum="ind"/>
    </div>
    <Alphabet/>
</template>

<script setup lang="ts">
    import  { useGameStore, Endings } from "../stores/game";
    import Row from './Row.vue';  
    import Finish from "./Finish.vue";  
    import Alphabet from "./Alphabet.vue";
    const game = useGameStore();    
    const guesses = game.$state.guesses;
</script>

<style scoped>
    #board{        
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>