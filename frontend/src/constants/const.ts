// Enums
export enum LetterState {
    PERFECT = 'perfect',
    CORRECT = 'correct',
    ABSENT = 'absent',
    UNKNOWN = 'unknown',
}

export enum DataSetState {
    FILLED = 'filled',
    EMPTY = 'empty',
}

export enum PressedKey {
    BACKSPACE = 'Backspace',
    ENTER = 'Enter',
}

// Constants
export const MAX_WORDS_DISPLAY = 5;

export const WORD_LENGTH = 5;

export const EMPTY_STRING = '';

export const API_URL = 'http://localhost:3000/api';

export const REQUEST = {
    "perfect": [
        { "letter": "p", "position": 1}
    ],
    "correct": [
        { "letter": "a", "position": 5}
    ],
    "absent": [{ "letter": "m", "position": [4]}]
}
