// Types
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

export type WordResponse = {
    words: Array<{ word: String }>;
}