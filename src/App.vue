<script setup lang="ts">  
  import Board from './components/Board.vue';  
  import  { useGameStore } from "./stores/game";
  import { onMounted } from "vue";
  const game = useGameStore();
  game.setAnswer();
  const guesses = game.$state.guesses;
  onMounted(
  ()=>{
    document.onkeydown = game.processKey;
  });
</script>


<template>
  <h1>Vor6le</h1>
  <Board/>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    
  }
  body{
    background-color: #0d2236;
  }
  h1{
    color: white;
    font-size: 4em;
    margin: 0.25em 0;
  }
  @media only screen and (max-width: 600px){
    h1{font-size: 10vw;}
  }
</style>
