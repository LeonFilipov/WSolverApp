import { BASE_QUERY } from './constants/const.js';
import  { AbsentLetter, Letter, Letters } from './types/types.js'

const QUERY_END = 'ORDER BY RANDOM() LIMIT 10;';

/**
 * 
 * @param letter 
 * @returns string - with the subquery 
 */
const perfectLetterQ = (letter: Letter): string => {
    return `SUBSTR(word, ${letter.position}, 1) = '${letter.letter}' AND `;
}
/**
 * 
 * @param letter 
 * @returns string - with the substring
 */
const correctLetterQ = (letter: Letter): string => {
    return `NOT SUBSTR(word, ${letter.position}, 1) = '${letter.letter}' AND word LIKE '%${letter.letter}%' AND `;
}
/**
 * 
 * @param letter - the absent letters to create the query
 * @returns string - correspondent subquery to filter the absent letters
 */
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
/**
 * 
 * @param letters - all the letters to create the query
 * @returns string - 
 */
export const createQuery = (letters: Letters): string  => {
    let query: string = BASE_QUERY;
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