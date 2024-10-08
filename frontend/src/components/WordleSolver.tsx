import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { WordleButton } from "./WordleButton";
import { WordleWord } from "./WordleWord";
import { API_URL, EMPTY_STRING, LetterState, MAX_WORDS_DISPLAY, PressedKey, REQUEST, WORD_LENGTH } from "../constants/const";
import './ResponseWord.css'
import axios from "axios";
import { ResponseDisplay } from "./ResponseDisplay";
import { WordResponse } from "../types/types";

export const WordleSolver = () => {
    const [wordsDisplay, setWords] = useState(1);
    const [input, setInput] = useState(EMPTY_STRING);
    const [response, setResponse] = useState<WordResponse>({ words: []});
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
        if (/^[a-zA-Z]$/.test(event.key) && input.length < WORD_LENGTH*wordsDisplay) {
            setInput(prev => prev + event.key.toUpperCase());
        }
    }

    const handleReset = () => {
        setInput(EMPTY_STRING);
        return true
    }

    const handleRemoveWord = () => {
        if (wordsDisplay > 1) {
            setWords(prev => prev - 1);
            setInput(prev => prev.slice(0, 5*(wordsDisplay-1)));
            return true
        }
        return false
    }

    const handleAddWord = () => {
        if (wordsDisplay < MAX_WORDS_DISPLAY) {
            setWords(prev => prev + 1);
            return true
        }
        return false
    }

    const handleSubmit = () => {
        if (input.length === WORD_LENGTH*wordsDisplay && document.getElementsByClassName(LetterState.UNKNOWN).length === 0) {
            axios.post(API_URL, REQUEST)
            .then((response) => {
                // TODO: Handle response -> show in component
                const res: WordResponse = response.data
                setResponse(res);
            })
            .catch((error) => {
                // TODO: Handle error -> show in component
                console.log('ERROR:', error);
            })
            .finally(() => {
                // TODO? show the page loading
                console.log('loading...');
            })
            return true
        }
        console.error('Fill all the words');
        return false
    }

    const handleResponseWord: MouseEventHandler = (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement;
        const word = target.innerText;
        
        if (input.length < WORD_LENGTH*wordsDisplay) {
            let next;
            if ((WORD_LENGTH*wordsDisplay - input.length) % 5 === 0) {
                next = input + word;
            } else {
                next = input.slice(0, Math.floor(input.length/5)*5) + word;
            }
            setInput(next);
            return true
        }
        if (wordsDisplay < 5) {
            setWords(wordsDisplay+1);
            setInput(prev => prev + word);
            return true
        }
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
        Array.from({ length: wordsDisplay }, (_, i) => {
            return <WordleWord key={i} wordNumber={i} last={false} text={input.slice(5*i, 5*i+5)}/>
        })
        }
        <div className="animated-div idle" data-state="idle"></div>
        <div className="buttons-nav">
            <WordleButton text={'Reset'} handleClick={ handleReset }/>
            <WordleButton text={' - '} handleClick={ handleRemoveWord }/>
            <WordleButton text={' + '} handleClick={ handleAddWord }/>
            <WordleButton text={'Get words'} handleClick={ handleSubmit }/>
        </div>
        <ResponseDisplay response={response} handler={ handleResponseWord }></ResponseDisplay>
        </>
    )
}