import { defineStore } from 'pinia';

let sampleGuesses=["secret", "tester", "sample", "winner", "losers", "gamers", "player","abcdef"]
const maxGuesses = 8;
const wordLength = 6;
const emptyGuesses = Array.from({length: maxGuesses}, _=>" ".repeat(wordLength))
export const useGameStore = defineStore({
    id: 'game',
    state: ()=>({
        maxGuesses: maxGuesses,
        wordLength: wordLength,
        row: 0, 
        col: 0,
        answer: "secret",
        guesses: emptyGuesses        
    }),
    actions:{
        processKey(event: KeyboardEvent){
            if ((event.key.length ==1)&&(this.col<wordLength)&&/[a-zA-Z]/.test(event.key)){                
                let guess = this.guesses[this.row];            
                this.guesses[this.row]=guess.substring(0, this.col)+event.key+" ".repeat(wordLength-this.col-1);
                this.col+=1;
            }            
            else if(event.key=="Backspace"){
                let guess = this.guesses[this.row];
                if(this.col>0){
                    this.col -=1;
                }
                this.guesses[this.row]=guess.substring(0, this.col)+" ".repeat(wordLength-this.col);                
            }  
            else if((event.key=="Enter")&&(this.col==wordLength)){
                this.processGuess();
                if(this.row<maxGuesses-1){
                    this.row += 1;
                    this.col=0;                    
                }
            }          
        },
        processGuess(){
            console.log("TODO: process guess");
        }
    }
})