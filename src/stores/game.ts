import { defineStore } from 'pinia';

let sampleGuesses=["secret", "tester", "sample", "winner", "losers", "gamers", "player","abcdef"]
export const useGameStore = defineStore({
    id: 'game',
    state: ()=>({
        maxGuesses: 8,
        wordLength: 6,
        row: 0, 
        col: 0,
        answer: "secret",
        guesses: sampleGuesses        
    })
})