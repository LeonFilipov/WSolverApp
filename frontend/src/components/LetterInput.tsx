import { useEffect, useState } from "react";
import { LetterState } from "../constants/const";
import { LetterInputProps } from "../types/types";

/** This component displays a letter and it have a state */
export const LetterInput = ({ id, letter }: LetterInputProps) => {
    const [letterState, setState] = useState(LetterState.UNKNOWN);

    useEffect(() => {
        setState(LetterState.UNKNOWN);
    }, [letter])

    const changeState = () => {
        if (letter !== '') {
            switch (letterState) {
                case LetterState.UNKNOWN:
                    setState(LetterState.PERFECT)
                    break;
                case LetterState.PERFECT:
                    setState(LetterState.CORRECT)
                    break;
                case LetterState.CORRECT:
                    setState(LetterState.ABSENT)
                    break;
                default:
                    setState(LetterState.UNKNOWN)
                    break;
            }
        }
    }

    return (
        <>
        <div 
            id={id} 
            className={`letter-input unselectable ${letterState}`}
            aria-readonly
            onClick={() => changeState()}
        > 
        { letter }
        </div>
        </>
    )
}