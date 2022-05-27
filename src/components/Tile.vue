<template>
    <div :class="'tile '+game.guesses[row][col].color">
        {{ game.guesses[row][col].letter.toUpperCase() }}
    </div>
</template>

<script setup lang="ts">
    import { useGameStore, ColoredLetter } from '../stores/game';
    const game = useGameStore();
    const props = defineProps<{        
        row:number,
        col:number
    }>()
</script>

<style scoped>
    .tile{
        border: 1px solid rgb(170, 170, 180);
        width: 4rem;
        height: 4rem;
        margin: 0.2em;
        display: flex;
        align-items: center;        
        justify-content: center;
        color: white;
        font-size: 2em;
    }
    .black{
        background-color: black;
    }
    .grey{
        background-color: rgb(58, 57, 57);
    }
    .green{
        background-color: rgb(6, 76, 17);
    }
    .yellow{
        background-color: rgb(169, 151, 12);
    }
    @media only screen and (max-width: 600px){
        .tile{
            width: 12vw;
            height: 12vw;
            font-size: 7vw;
        }
    }
</style>