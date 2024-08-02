import  { AbsentLetter, Letter, Letters } from './types/types'

const QUERY_END = 'ORDER BY RANDOM() LIMIT 10;';

const perfectLetterQ = (letter: Letter): string => {
    return `SUBSTR(word, ${letter.position}, 1) = '${letter.letter}' AND `;
}

const correctLetterQ = (letter: Letter): string => {
    return `NOT SUBSTR(word, ${letter.position}, 1) = '${letter.letter}' AND word LIKE '%${letter.letter}%' AND `;
}

const absentLetterQ = (letter: AbsentLetter): string => {
    if (letter.position.length === 0) {
        return `NOT word LIKE '%${letter.letter}%' AND `;
    }
    let res = '';
    for (let pos of letter.position) {
        res += `NOT SUBSTR(word, ${pos}, 1) = '${letter.letter}' AND `;
    }
    return res;
}

// Query creation
export const createQuery = (letters: Letters): string  => {
    let query: string = '';
    for (let letter of letters.perfect) {
        query += perfectLetterQ(letter);
    }
    for (let letter of letters.correct) {
        query += correctLetterQ(letter);
    }
    for (let letter of letters.absent) {
        query += absentLetterQ(letter);
    }
    query = query.slice(0, -4); // quit AND
    query += QUERY_END;
    return query;
};
