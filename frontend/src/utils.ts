import { DataSetState, LetterState } from "./constants/const";
import { AbsentLetter, Letter, Letters } from "./types/types";

/**
 * Change the class of the element as follows:
 * unknown -> perfect -> correct -> absent
 * @param {HTMLInputElement} inputElement  
 */
export function classChanger(inputElement: HTMLDivElement) {
  if (inputElement.classList.contains(LetterState.CORRECT)) {
    inputElement.classList.remove(LetterState.CORRECT);
    inputElement.classList.add(LetterState.ABSENT);
  }
  else if (inputElement.classList.contains(LetterState.ABSENT)) {
    inputElement.classList.remove(LetterState.ABSENT);
    inputElement.classList.add(LetterState.UNKNOWN);
  }
  else if (inputElement.classList.contains(LetterState.PERFECT)) {
    inputElement.classList.remove(LetterState.PERFECT);
    inputElement.classList.add(LetterState.CORRECT);
  }
  else {
    inputElement.classList.remove(LetterState.UNKNOWN);
    inputElement.classList.add(LetterState.PERFECT);
  }
};

/**
 * Reset the class to unknown
 * @param {HTMLInputElement} inputElement 
 */
export function resetInput(inputElement: HTMLDivElement) {
  inputElement.textContent = '';
  inputElement.dataset.state = DataSetState.EMPTY;
  inputElement.classList.remove(LetterState.CORRECT);
  inputElement.classList.remove(LetterState.PERFECT);
  inputElement.classList.remove(LetterState.ABSENT);
  inputElement.classList.add(LetterState.UNKNOWN);
};

/**
 * When you click the element, change the class
 * @param {HTMLInputElement} inputElement 
 */
export function eventListenerInputs(inputElement: HTMLDivElement) {
  inputElement.addEventListener('click', () => {
    if (inputElement.dataset.state === DataSetState.FILLED) {
      classChanger(inputElement);
    }
  });
};

/**
 * Take the input of the user and make the JSON to send to the API.
 * @returns {object} 
 */
export function createWordObject(): Letters {
  const perfect: Letter[] = [];
  const correct: Letter[] = [];
  const absent: AbsentLetter[] = [];
  document.querySelectorAll('.wordle-word').forEach((inputElement) => {
    inputElement.querySelectorAll('.letter-input').forEach((inputLetter) => {
      if (inputLetter instanceof HTMLDivElement) {
        const letterId = parseInt(inputLetter.id);
        const letter = inputLetter.textContent;
        let letterPosition: number;
        if (!isNaN(letterId) && letter) {
          letterPosition = letterId % 5;
        } else {
          throw new Error(`Error in ${inputLetter}`)
        }
        let used = false;
        if (letterPosition === 0) {
            letterPosition = 5;
        }

        if (inputLetter.classList.contains(LetterState.PERFECT)) {
          pushLetter(perfect, letter, letterPosition);
        } else if (inputLetter.classList.contains(LetterState.CORRECT)) {
          pushLetter(correct, letter, letterPosition);
        }
        else { // Absent
          for (const aLetter of absent) {
            if (aLetter.letter === letter){
              if (!aLetter.position.includes(letterPosition)) {
                aLetter.position.push(letterPosition);
              }
              used = true;
              break
            }
          }
          if (!used) { // No se utilizo antes.
            if (letterInObject(letter, perfect) || letterInObject(letter, correct)) {
              absent.push({
                letter: letter,
                position: [letterPosition]
              }) // First push of the letter.
            }
            else {
              absent.push({
                letter: letter,
                position: []
              })
            }
          }
        }
      }
    });
  });

  return {
      perfect,
      correct,
      absent
  };
};

/**
 * Search if the object includes the letter.
 * @param inputLetter 
 * @param object 
 * @returns boolean
 */
function letterInObject(inputLetter: string, object: Letter[]): boolean {
  for (const letter of object) {
    if (letter.letter == inputLetter) return true
  }
  return false
}
/**
 * 
 * @param cont 
 * @param letter 
 * @param position 
 */
const pushLetter = (cont: Letter[], letter: string, position: number) => {
  let used = false;
  for (const contLetter of cont) {
      if (contLetter.letter === letter && contLetter.position === position) {
          used = true;
          break
      }
  }
  let newLetter: Letter = {
      letter: letter,
      position: position
  }
  if (!used) {
      cont.push(newLetter)
  }
}

/**
 * Fetch the API.
 * @param words 
 */
export async function submitWords(words: Letters) {
  await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(words)
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error('Something went wrong');
    }
  }).then(data => {
    // console.log(data);
    showResponses(data);
  }).catch(error => {
    console.error(error)
  });
};

export function showResponses(response) {
  let htmlColumn1 = '';
  let htmlColumn2 = '';
  let col = true; // Column number
  for (const word of response.words) {
    if (col){
      htmlColumn1 += `<button class="button-display button">${word.word}</button>`;
    }
    else {
      htmlColumn2 += `<button class="button-display button">${word.word}</button>`;
    }
    col = !col;
  }
  document.querySelector('#col-1').innerHTML = htmlColumn1;
  document.querySelector('#col-2').innerHTML = htmlColumn2; 
  document.querySelectorAll('.button-display').forEach((button) => {
    button.addEventListener('click', () => {
      addWord(button.textContent);
    });
  });
};
/**
 * Add a new word with a limit of 6 words.
 * @param textContent 
 * @returns 
 */
export function addWord(textContent = '') {
  const lastElement = document.querySelector('.last');
  if (lastElement) {
    const wordleWordId = parseInt(lastElement.id[lastElement.id.length-1]);
    if (wordleWordId === 5) {
      // TODO: Show a message to the user plus animations
      return Error('You can only have 5 words');
    }

    lastElement.classList.remove('last');
    const newElement = lastElement.cloneNode(true) as HTMLDivElement;
    newElement.id = `wordle-word-${wordleWordId + 1}`;
    newElement.classList.add('last');
    // Add event listener and id to the new inputs
    let letterInputId = wordleWordId * 5 + 1;
    newElement.querySelectorAll('.letter-input').forEach((inputElement) => {
      if (inputElement instanceof HTMLDivElement) {
        eventListenerInputs(inputElement);
        inputElement.id = letterInputId.toString();
        resetInput(inputElement);
        if (textContent !== '') {
          if (letterInputId % 5 === 0) {
            inputElement.textContent = textContent[4];
          }
          else {
            inputElement.textContent = textContent[letterInputId % 5 - 1];
          }
          inputElement.dataset.state = DataSetState.FILLED;
        }
        letterInputId++;
      }
    });
    const elem = document.querySelector('.wordle')
    if (elem) {
      elem.insertBefore(newElement, document.querySelector('.animated-div'));
    }
  }
}