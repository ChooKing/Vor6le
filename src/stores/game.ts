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
export type Letter = typeof qwerty[number] | ' ';
const emptyAlphabet = Object.fromEntries(qwerty.map(el=>[el, Colors.Black]));
export interface ColoredLetter{
    letter: Letter;
    color: Colors;
}
type LetterCounts = Map<Letter, number>;
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
        answer: [] as Letter[],
        answerCounts: new Map<Letter, number>() as LetterCounts,
        guesses: [] as ColoredLetter[][],
        status: Statuses.Playing
    }),
    actions:{
        setAnswer(){
            let randIndex = Math.round(Math.random()*wordListLength);
            this.answer = wordList[randIndex].toUpperCase().split('') as Letter[];
            this.answerCounts = new Map<Letter, number>() as LetterCounts;
            this.answer.forEach((letter)=>{
                if(!this.answerCounts.has(letter)){
                    this.answerCounts.set(letter, 1);
                }
                else{
                    this.answerCounts.set(letter, this.answerCounts.get(letter)!+1);
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
        processLetter(l: Letter){
            this.guesses[this.row][this.col].letter = l;
            this.col+=1;
        },
        processBackspace(){
            if (this.row<maxGuesses){    
                if(this.status==Statuses.Invalid) this.status=Statuses.Playing;            
                if(this.col>0){
                    this.col -=1;
                }
                this.guesses[this.row][this.col].letter = " ";              
            }  
        },
        processEnter(){
            if (this.col==wordLength){
                this.processGuess();                
            }          
        },
        setKeyColor(letter: Letter, color: Colors){                       
            if(this.alphabet[letter]!=Colors.Green){
                this.alphabet[letter] = color;
            }            
        },
        getColors(guess: ColoredLetter[]){            
            const greenCounts=new Map<Letter, number>();
            const guessCounts=new Map<Letter, number>();
            const yellowCounts=new Map<Letter, number>();
            this.status=Statuses.Win;            
            guess.forEach((item)=>{
                if(!guessCounts.has(item.letter)){
                    guessCounts.set(item.letter, 1);
                }
                else{
                    guessCounts.set(item.letter, guessCounts.get(item.letter)!+1);
                }
            });            
            guess.forEach((el, idx)=>{
                if(el.letter==this.answer[idx]){
                    if(greenCounts.has(el.letter)){
                        greenCounts.set(el.letter, greenCounts.get(el.letter)!+1);
                    }
                    else{
                        greenCounts.set(el.letter, 1);                        
                    } 
                    this.setKeyColor(el.letter, Colors.Green);
                }
                else{
                    this.status=Statuses.Playing;
                    if(!greenCounts.has(el.letter)) greenCounts.set(el.letter, 0);
                }
            });            
            guess.forEach((el, idx)=>{        
                if(this.answer.includes(el.letter)){
                    if(el.letter==this.answer[idx]){
                        el.color=Colors.Green;                                                
                    }
                    else{
                        if(!yellowCounts.has(el.letter)){
                            yellowCounts.set(el.letter,0);
                        }
                        if(yellowCounts.get(el.letter)!+greenCounts.get(el.letter)!<this.answerCounts.get(el.letter)!){
                            this.setKeyColor(el.letter, Colors.Yellow);
                            el.color=Colors.Yellow;
                        } 
                        else{
                            el.color=Colors.Grey;
                            this.setKeyColor(el.letter, Colors.Grey);
                        }
                        yellowCounts.set(el.letter, yellowCounts.get(el.letter)!+1);
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
                //TODO: Refactor to pass only row number!!!!!!!!!!!!!!
                if(this.row<maxGuesses){
                    this.row += 1;
                    this.col=0;                    
                }
                if((this.row>=this.maxGuesses)&&(this.status!=Statuses.Win)) this.status=Statuses.Lose;                
            }
            else{
                this.status = Statuses.Invalid;
            }
        }
    }
})