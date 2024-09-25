import { useEffect, useState } from "react";
import { LetterState } from "../constants/const";
import { LetterInputProps } from "../types/types";

/** This component displays a letter and it have a state */
export const LetterInput = ({ id, letter, onStateChange }: LetterInputProps) => {
    const [letterState, setState] = useState(LetterState.UNKNOWN);

    useEffect(() => {
        setState(LetterState.UNKNOWN);
    }, [letter])

    const onSetState = (newState: LetterState) => {
        setState(newState);
        onStateChange(newState, id % 5);
    }

    const changeState = () => {
        if (letter !== '') {
            switch (letterState) {
                case LetterState.UNKNOWN:
                    onSetState(LetterState.PERFECT)
                    break;
                case LetterState.PERFECT:
                    onSetState(LetterState.CORRECT)
                    break;
                case LetterState.CORRECT:
                    onSetState(LetterState.ABSENT)
                    break;
                default:
                    onSetState(LetterState.UNKNOWN)
                    break;
            }
        }
    }

    return (
        <>
        <div 
            id={'letter-' + id} 
            className={`letter-input unselectable ${letterState}`}
            aria-readonly
            onClick={() => changeState()}
        > 
        { letter }
        </div>
        </>
    )
}