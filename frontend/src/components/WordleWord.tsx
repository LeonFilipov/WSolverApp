import { WordleWordProps } from "../types/types"
import { LetterInput} from "./LetterInput"

/** This components represent a word containing X LetterInput components*/
export const WordleWord = ({ wordNumber, last, text}: WordleWordProps) => {
    return (
        <>
        <section id={`wordle-word-${wordNumber}`} className={`wordle-word ${last ?? 'last'}`}>
            {
                Array.from({ length: 5 }, (_, i) => (
                    <LetterInput key={i} id={'letter-'+((wordNumber)*5 + i)} letter={text.slice(i,i+1)}/>
                ))
            }
        </section>
        </>
    )
}