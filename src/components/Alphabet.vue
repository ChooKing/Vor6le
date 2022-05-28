<template>
    <div id="alphabetContainer">
        <div>
            <button v-for="item in 10" @click="processButton" :class="game.alphabet[letters[item-1]]">{{letters[item-1]}}</button>
        </div>
        <div>
            <button v-for="item in 9" @click="processButton" :class="game.alphabet[letters[item+9]]">{{letters[item+9]}}</button>            
        </div>
        <div>
            <button @click="game.processEnter" class="black control" >ENTER</button>
            <button v-for="item in 7" @click="processButton" :class="game.alphabet[letters[item+18]]">{{letters[item+18]}}</button>
            <button @click="game.processBackspace" class="black control">&lAarr;</button>            
        </div>        
    </div>
</template>

<script setup lang="ts">
    import { Letter, useGameStore } from '../stores/game';
    const game = useGameStore();
    const letters = Object.keys(game.alphabet);
    function processButton(event:Event){
        const button = event.target as HTMLElement;
        const letter = button.innerHTML.toUpperCase() as Letter;
        game.processLetter(letter);
    }
</script>

<style scoped>    
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
    #alphabetContainer button.control{        
        width: auto;
    }
    @media only screen and (max-width: 800px){
        #alphabetContainer button{
            width: 7vw;
            margin: 0.25vw;
            font-size: 5vw;
            padding: 3px;
        }  
        .control{            
            font-size: 5vw;
        }      
    }
    @media only screen and (max-width: 400px){
        #alphabetContainer button{
            width: 7vw;
            margin: 0.15vw;
            font-size: 5vw;
            padding: 2px;
        }  
        .control{            
            font-size: 5vw;
        }      
    }
</style>