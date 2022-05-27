<template>
    <div class="modal">        
        <span v-if="game.status==Statuses.Lose">Better luck next time. </span>
        <span v-if="game.status==Statuses.Win">Congatulations! </span>
        <span v-if="game.status==Statuses.Invalid">Not in word list. </span>
        <button v-if="game.status==Statuses.Lose || game.status==Statuses.Win" @click="game.reset">Play Again</button>
    </div>
    
</template>

<script setup lang="ts">
    import { useGameStore, Statuses } from '../stores/game';
    const game = useGameStore();
</script>

<style scoped>
    .modal{
        
        margin: auto;
        padding: 0;
        font-size: 2em;
        color:rgb(158, 213, 148);        
    }
    .modal button{
        background-color: rgba(79, 129, 25, 0.5);
        font-size: 2rem;
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