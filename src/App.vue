<script setup lang="ts">  
  import Board from './components/Board.vue';  
  import { provide, onMounted } from "vue";
  const max_guesses = 8;
  const word_length = 6;
  const game_settings={
      guesses: 8,
      length: 6
  };  
  provide('settings', game_settings); 
  const game_status={
    row: 0,
    column: 0,
    letter: null
  }
  provide('status', game_status);
  
  onMounted(
    ()=>{
      document.onkeydown = processKey;
    }
  )
</script>
<script lang="ts">  
  function processKey(event: KeyboardEvent){
        console.log(event.key);
    }
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
    font-size: 6em;
    margin: 0.25em 0;
  }
</style>
