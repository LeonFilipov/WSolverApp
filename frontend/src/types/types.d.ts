import { LetterState } from "../constants/const";

export type Letter = {
    letter: string;
    position: number;
}

export type AbsentLetter = {
    letter: string;
    position: number[];
}

export type Letters = {
    perfect: Letter[];
    correct: Letter[];
    absent: AbsentLetter[];
}

export interface LetterInputProps {
    id: number,
    letter: string,
    onStateChange: (LetterState, number) => void
}

export interface WordleWordProps {
    wordNumber: number,
    last: boolean,
    text: string,
}

export interface ButtonProps {
    text: string,
    handleClick: () => boolean,
}

export type WordResponse = {
    words: Array<{ word: String }>;
}