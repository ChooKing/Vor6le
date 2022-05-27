import { defineStore } from 'pinia';
import { wordList } from './finalwords';
import { allWords } from './allwords';
const maxGuesses = 6;
const wordLength = 6;

enum Colors{
    Black="black", Grey="grey", Yellow="yellow", Green="green"
}
export enum Statuses{
    Win, Lose, Playing, Invalid
}
const qwerty = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'] as const;
type Letter = typeof qwerty[number] | ' ';
const emptyAlphabet = Object.fromEntries(qwerty.map(el=>[el, Colors.Black]));
export interface ColoredLetter{
    letter: Letter;
    color: Colors;
}
type LetterCounts = {[key: string]: number}
type AlphabetColors = {[key: string]: Colors}
interface GreenPositions{
    letter: Letter;
    position: number;
}

const wordListLength = wordList.length;

export const useGameStore = defineStore({
    id: 'game',
    state: ()=>({
        maxGuesses: maxGuesses,
        wordLength: wordLength,
        row: 0, 
        col: 0,
        alphabet: {} as AlphabetColors,
        answer: [] as string[],
        answerCounts: {} as LetterCounts,
        guesses: [] as ColoredLetter[][],
        status: Statuses.Playing
    }),
    actions:{
        setAnswer(){
            let randIndex = Math.round(Math.random()*wordListLength);
            this.answer = wordList[randIndex].toUpperCase().split('');                
            this.answer.forEach((letter)=>{
                if(!this.answerCounts[letter]){
                    this.answerCounts[letter]=1;
                }
                else{
                    this.answerCounts[letter]++;
                }
            });
            this.alphabet={...emptyAlphabet};            
            this.guesses=Array.from({length: maxGuesses}, _=>Array.from({length: wordLength}, _=>({letter: " ", color: Colors.Black})));            
        },
        reset(){
            this.setAnswer();
            this.row=0;
            this.col=0;            
            this.status=Statuses.Playing;            
        },
        processKey(event: KeyboardEvent){
            if ((event.key.length ==1)&&(this.col<wordLength)&&/[a-zA-Z]/.test(event.key)){                                
                this.guesses[this.row][this.col].letter = event.key.toUpperCase() as Letter;
                this.col+=1;
            }            
            else if((event.key=="Backspace")&&(this.row<maxGuesses)){    
                if(this.status==Statuses.Invalid) this.status=Statuses.Playing;            
                if(this.col>0){
                    this.col -=1;
                }
                this.guesses[this.row][this.col].letter = " ";              
            }  
            else if((event.key=="Enter")&&(this.col==wordLength)){
                this.processGuess();                
            }          
        },
        setKeyColor(letter: Letter, color: Colors){                       
            if(this.alphabet[letter]!=Colors.Green){
                this.alphabet[letter] = color;
            }            
        },
        getColors(guess: ColoredLetter[]){            
            const greenCounts: LetterCounts={};
            const guessCounts: LetterCounts={};
            const yellowCounts: LetterCounts={};
            this.status=Statuses.Win;
            
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
                    this.setKeyColor(el.letter, Colors.Green);
                }
                else{
                    this.status=Statuses.Playing;
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
                            this.setKeyColor(el.letter, Colors.Yellow);
                            el.color=Colors.Yellow;
                        } 
                        else{
                            el.color=Colors.Grey;
                            this.setKeyColor(el.letter, Colors.Grey);
                        }
                        yellowCounts[el.letter]++;
                    }            
                }
                else{
                    el.color=Colors.Grey;
                    this.setKeyColor(el.letter, Colors.Grey);
                }
            });    
        },
        processGuess(){
            const possibleWord = this.guesses[this.row].reduce((acc, el)=>acc+el.letter, "").toLowerCase();            
            if(allWords.includes(possibleWord)){                
                this.getColors(this.guesses[this.row]);
                if(this.row<maxGuesses){
                    this.row += 1;
                    this.col=0;                    
                }
                if(this.row>=this.maxGuesses) this.status=Statuses.Lose;                
            }
            else{
                this.status = Statuses.Invalid;
            }
        }
    }
})