<template>
    <div class="modal">
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
        height: 50vh;
        width: 50vw;
        margin: auto;
        font-size: 5em;
        color:rgb(45, 165, 21);
        background-color: rgba(11, 52, 88, 0.5);
    }
</style>