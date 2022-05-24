import { defineStore } from 'pinia';
import { wordList } from './finalwords';
const maxGuesses = 8;
const wordLength = 6;

enum Colors{
    Black="black", Grey="grey", Yellow="yellow", Green="green"
}
export enum Endings{
    Win, Lose, Playing
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

const wordListLength = wordList.length;

export const useGameStore = defineStore({
    id: 'game',
    state: ()=>({
        maxGuesses: maxGuesses,
        wordLength: wordLength,
        row: 0, 
        col: 0,
        answer: [] as string[],
        answerCounts: {} as LetterCounts,
        guesses: emptyGuesses,
        ending: Endings.Playing
    }),
    actions:{
        setAnswer(){
            let randIndex = Math.round(Math.random()*wordListLength);
            this.answer = wordList[randIndex].split('');            
            this.answer.forEach((letter)=>{
                if(!this.answerCounts[letter]){
                    this.answerCounts[letter]=1;
                }
                else{
                    this.answerCounts[letter]++;
                }
            });
        },
        reset(){
            this.setAnswer();
            this.row=0;
            this.col=0;
            for(let i=0; i<maxGuesses; i++){
                for(let j=0; j<wordLength; j++){
                    this.guesses[i][j]={letter: " ", color: Colors.Black};
                }
            }
            this.ending=Endings.Playing;            
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
            this.ending=Endings.Win;
            
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
                    this.ending=Endings.Playing;
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
            if(this.row>=this.maxGuesses-1) this.ending=Endings.Lose;
            
        }
    }
})