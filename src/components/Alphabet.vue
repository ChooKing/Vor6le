<template>
    <div id="alphabetContainer">
        <div>
            <button v-for="item in 10" :class="game.alphabet[letters[item-1]]">{{letters[item-1]}}</button>
        </div>
        <div>
            <button v-for="item in 9" :class="game.alphabet[letters[item+9]]">{{letters[item+9]}}</button>            
        </div>
        <div>
            <button v-for="item in 7" :class="game.alphabet[letters[item+18]]">{{letters[item+18]}}</button>            
        </div>        
    </div>
</template>

<script setup lang="ts">
    import { useGameStore } from '../stores/game';
    const game = useGameStore();
    const letters = Object.keys(game.alphabet);
</script>

<style scoped>
    #alphabetContainer{
        

    }
    #alphabetContainer button{
        color:white;        
        font-size: 2.5rem;
        width: 3.5rem;
        margin: 0.25rem;
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
</style>