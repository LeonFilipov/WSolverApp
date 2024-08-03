/**
 * 
 * @param {HTMLInputElement} inputElement change the class of the element
 */
export function classChanger(inputElement: HTMLInputElement) {
  if (inputElement.classList.contains('correct')) {
    inputElement.classList.remove('correct');
    inputElement.classList.add('absent');
  }
  else if (inputElement.classList.contains('absent')) {
    inputElement.classList.remove('absent');
    inputElement.classList.add('unknown');
  }
  else if (inputElement.classList.contains('perfect')) {
    inputElement.classList.remove('perfect');
    inputElement.classList.add('correct');
  }
  else {
    inputElement.classList.remove('unknown');
    inputElement.classList.add('perfect');
  }
};

/**
 * 
 * @param {HTMLInputElement} inputElement reset the class to unknown
 */
export function resetInput(inputElement: HTMLInputElement) {
  inputElement.textContent = '';
  inputElement.dataset.state = 'empty';
  inputElement.classList.remove('correct');
  inputElement.classList.remove('perfect');
  inputElement.classList.remove('absent');
  inputElement.classList.add('unknown');
};

/**
 * When you click the element, change the class
 * @param {HTMLInputElement} inputElement 
 */
export function eventListenerInputs(inputElement: HTMLInputElement) {
  inputElement.addEventListener('click', () => {
    if (inputElement.dataset.state === 'filled') {
      classChanger(inputElement);
    }
  });
};

/**
 * 
 * @returns {object} With fields {perfect, correct, absent}
 */
export function createWordObject() {
  const perfect = [];
  const correct = [];
  const absent = [];
  document.querySelectorAll('.wordle-word').forEach((inputElement) => {
      inputElement.querySelectorAll('.letter-input').forEach((inputLetter) => {
          let letterPosition = inputLetter.id % 5;
          const letter = inputLetter.textContent;
          let used = false;
          if (letterPosition === 0) {
              letterPosition = 5;
          }
          if (inputLetter.classList.contains('perfect')) {
              for (const pLetter of perfect) {
                  if (pLetter.letter === letter && pLetter.position === letterPosition) {
                      used = true;
                      break;
                  }
              }
              if (!used) {
                  perfect.push({
                      letter: letter,
                      position: letterPosition
                  })
              }
          }
          else if (inputLetter.classList.contains('correct')) {
              for (const cLetter of correct) {
                  if (cLetter.letter === letter && cLetter.position === letterPosition) {
                      used = true;
                      break;
                  }
              }
              if (!used) {
                  correct.push({
                      letter: letter,
                      position: letterPosition
                  })
              }
          }
          else { // Absent
              for (const aLetter of absent) {
                  if (aLetter.letter === letter){
                      if (aLetter.position.length !== 0 && !aLetter.position.includes(letterPosition)) {
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
      });
  });
  return {
      perfect,
      correct,
      absent
  };
};

function letterInObject(inputElementLetter, object) {
  for (const p of object) {
    if (p.letter == inputElementLetter) {
      return true;
    }
  }
  return false;
}

export async function submitWords(words) {
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
    console.log(data);
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

export function addWord(textContent = '') {
  const lastElement = document.querySelector('.last');
  const wordleWordId = parseInt(lastElement.id.at(-1));
  if (wordleWordId === 5) {
    // TODO: Show a message to the user plus animations
    return Error('You can only have 5 words');
  }

  lastElement.classList.remove('last');
  const newElement = lastElement.cloneNode(true);
  newElement.id = `wordle-word-${wordleWordId + 1}`;
  newElement.classList.add('last');
  // Add event listener and id to the new inputs
  let letterInputId = wordleWordId * 5 + 1;
  newElement.querySelectorAll('.letter-input').forEach((inputElement) => {
    eventListenerInputs(inputElement);
    inputElement.id = letterInputId;
    resetInput(inputElement);
    if (textContent !== '') {
      if (letterInputId % 5 === 0) {
        inputElement.textContent = textContent[4];
      }
      else {
        inputElement.textContent = textContent[letterInputId % 5 - 1];
      }
      inputElement.dataset.state = 'filled';
    }
    letterInputId++;
  });
  document.querySelector('.wordle').insertBefore(newElement, document.querySelector('.animated-div'));
}