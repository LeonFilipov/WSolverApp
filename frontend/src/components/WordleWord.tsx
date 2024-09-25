import { useRef, useState } from "react"
import { Letter, WordleWordProps } from "../types/types"
import { LetterInput} from "./LetterInput"
import { LetterState } from "../constants/const";

/** This components represent a word containing X LetterInput components*/
export const WordleWord = ({ wordNumber, last, text}: WordleWordProps) => {
    const letterStateRef = useRef<LetterState[]>([]);

    const handleChangeState = (newValue: LetterState, id: number) => {
        letterStateRef.current[id] = newValue;
        console.log(letterStateRef.current, id);
    }

    return (
        <>
        <section id={`wordle-word-${wordNumber}`} className={`wordle-word ${last ?? 'last'}`}>
            {
                Array.from({ length: 5 }, (_, i) => (
                    <LetterInput 
                        key={i}
                        id={((wordNumber)*5 + i)}
                        letter={text.slice(i,i+1)}
                        onStateChange={handleChangeState}
                    />
                ))
            }
        </section>
        <div> {letterStateRef.current[0]} </div>
        </>
    )
}