import { useEffect, useRef, useState } from "react";
import { WordleButton } from "./WordleButton";
import { WordleWord } from "./WordleWord";
import { PressedKey } from "../constants/const";

export const WordleSolver = () => {
    const [words, setWords] = useState(1);
    const [input, setInput] = useState('');
    const handleKeyDownRef = useRef<(event: KeyboardEvent) => void>(()=>{});

    handleKeyDownRef.current = (event: KeyboardEvent) => {
        if (event.key === PressedKey.BACKSPACE) {
            const nextInput = input.slice(0, -1);
            setInput(nextInput);
            return
        } 
        if (event.key === PressedKey.ENTER) {
            handleSubmit();
            return
        }
        if (/^[a-zA-Z]$/.test(event.key) && input.length < 5*words) {
            setInput(input + event.key.toUpperCase());
        }
    }

    const handleReset = () => {
        setInput('');
        return true
    }
    const handleRemoveWord = () => {
        if (words > 1) {
            setWords(words - 1);
            return true
        }
        return false
    }
    const handleAddWord = () => {
        if (words < 5) {
            setWords(words+1);
            return true
        }
        return false
    }
    const handleSubmit = () => {
        // TODO: Validation and request to the API.
        return false
    }

    // Effect to add the keydown event listener.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => handleKeyDownRef.current(event);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    return (
        <>
        {
            Array.from({ length: words }, (_, i) => {
                return <WordleWord key={i} wordNumber={i} last={false} text={input.slice(5*i, 5*i+5)}/>
            })
        }
        <div className="animated-div idle" data-state="idle"></div>
        <div className="buttons-nav">
            <WordleButton text={'Reset'} handleClick={handleReset}/>
            <WordleButton text={' - '} handleClick={handleRemoveWord}/>
            <WordleButton text={' + '} handleClick={handleAddWord}/>
            <WordleButton text={'Get words'} handleClick={handleSubmit}/>
        </div>
        </>
    )
}