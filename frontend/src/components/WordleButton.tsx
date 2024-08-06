import { ButtonProps } from "../types/types"

/** This component is a button of the wordle */
export const WordleButton = ({text, handleClick}: ButtonProps) => {
    return (
        <button className="button unselectable" onClick={handleClick}>
            {text}
        </button>
    )
}