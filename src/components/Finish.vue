<template>
    <div class="modal">
        <div id="close" @click="()=>{game.ending=Endings.Playing}">
            X
        </div>
        <h2 v-if="game.ending==Endings.Lose">YOU LOSE</h2>
        <h2 v-if="game.ending==Endings.Win">YOU WIN</h2>
        <button @click="game.reset">Play Again</button>
    </div>
    
</template>

<script setup lang="ts">
    import { useGameStore, Endings } from '../stores/game';
    const game = useGameStore();
</script>

<style scoped>
    .modal{
        position: absolute;
        z-index: 3;
        height: 25vh;
        width: 25vw;
        margin: auto;
        padding: 0;
        font-size: 5em;
        color:rgb(158, 213, 148);
        background-color: rgba(11, 52, 88, 0.5);
    }
    .modal button{
        background-color: rgba(79, 129, 25, 0.5);
        font-size: 4rem;
        cursor: pointer;
    }
    h2{
        margin: 10px;
    }
    button:hover{
        background-color: rgba(11, 80, 57);
        color: yellow;
        
    }
    #close{
        position: absolute;
        margin: 5px;
        padding: 5px;
        top: 0;
        right: 0;    
        border: 1px solid rgb(16, 1, 1);    
        font-size: 2rem;
        background-color: rgb(40, 40, 168);
        color: black;
        cursor:pointer;
    }
    #close:hover{
        background-color:rgb(18, 155, 109)
    }
</style>