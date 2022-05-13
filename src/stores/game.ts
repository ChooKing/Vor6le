import { defineStore } from 'pinia';
const maxGuesses = 8;
const wordLength = 6;

enum Colors{
    Black="black", Grey="grey", Yellow="yellow", Green="green"
}
export interface ColoredLetter{
    letter: string;
    color: Colors;
}
const emptyGuesses = Array.from({length: maxGuesses}, _=>Array.from({length: wordLength}, _=>({letter: " ", color: Colors.Black})));
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
                this.guesses[this.row][this.col].letter = event.key;
                this.col+=1;
            }            
            else if(event.key=="Backspace"){                
                if(this.col>0){
                    this.col -=1;
                }
                this.guesses[this.row][this.col].letter = " ";              
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
            this.guesses[this.row].forEach(
                item=>item.color=Colors.Grey
            );
            console.log("TODO: process guess");
        }
    }
})