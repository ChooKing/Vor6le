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
type LetterCounts = {[key: string]: number}
interface GreenPositions{
    letter: string;
    position: number;
}
const emptyGuesses = Array.from({length: maxGuesses}, _=>Array.from({length: wordLength}, _=>({letter: " ", color: Colors.Black})));

export const useGameStore = defineStore({
    id: 'game',
    state: ()=>({
        maxGuesses: maxGuesses,
        wordLength: wordLength,
        row: 0, 
        col: 0,
        answer: [] as string[],
        answerCounts: {} as LetterCounts,
        guesses: emptyGuesses
    }),
    actions:{
        setAnswer(word: string){
            this.answer=word.split('');
            this.answer.forEach((letter)=>{
                if(!this.answerCounts[letter]){
                    this.answerCounts[letter]=1;
                }
                else{
                    this.answerCounts[letter]++;
                }
            });
        },
        processKey(event: KeyboardEvent){
            if ((event.key.length ==1)&&(this.col<wordLength)&&/[a-zA-Z]/.test(event.key)){                                
                this.guesses[this.row][this.col].letter = event.key;
                this.col+=1;
            }            
            else if((event.key=="Backspace")&&(this.row<maxGuesses)){                
                if(this.col>0){
                    this.col -=1;
                }
                this.guesses[this.row][this.col].letter = " ";              
            }  
            else if((event.key=="Enter")&&(this.col==wordLength)){
                this.processGuess();
                if(this.row<maxGuesses){
                    this.row += 1;
                    this.col=0;                    
                }
            }          
        },
        getColors(guess: ColoredLetter[]){            
            const greenCounts: LetterCounts={};
            const guessCounts: LetterCounts={};
            const yellowCounts: LetterCounts={};
            guess.forEach((item)=>{
                if(!guessCounts[item.letter]){
                    guessCounts[item.letter]=1;
                }
                else{
                    guessCounts[item.letter]++;
                }
            });            
            guess.forEach((el, idx)=>{
                if(el.letter==this.answer[idx]){
                    if(el.letter in greenCounts){
                        greenCounts[el.letter]++;
                    }
                    else{
                        greenCounts[el.letter]=1;                        
                    } 
                }
                else{
                    if(!greenCounts[el.letter]) greenCounts[el.letter]=0;
                }
            });            
            guess.forEach((el, idx)=>{        
                if(this.answer.includes(el.letter)){
                    if(el.letter==this.answer[idx]){
                        el.color=Colors.Green;                                                
                    }
                    else{
                        if(!yellowCounts[el.letter]){
                            yellowCounts[el.letter] = 0;
                        }
                        if(yellowCounts[el.letter]+greenCounts[el.letter]<this.answerCounts[el.letter]){
                            el.color=Colors.Yellow;
                        } 
                        else{
                            el.color=Colors.Grey;
                        }
                        yellowCounts[el.letter]++;
                    }            
                }
                else{
                    el.color=Colors.Grey;
                }
            });    
        },
        processGuess(){            
            this.getColors(this.guesses[this.row]);
        }
    }
})