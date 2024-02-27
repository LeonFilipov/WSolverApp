// Change the class of the input element to the next state.
export function classChanger(inputElement) {
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

// This function is to reset the input.
export function resetInput(inputElement) {
  inputElement.textContent = '';
  inputElement.dataset.state = 'empty';
  inputElement.classList.remove('correct');
  inputElement.classList.remove('perfect');
  inputElement.classList.remove('absent');
  inputElement.classList.add('unknown');
};

// This function is to change the state of the input when it is clicked
export function eventListenerInputs(inputElement) {
  inputElement.addEventListener('click', () => {
    if (inputElement.dataset.state === 'filled') {
      classChanger(inputElement);
    }
  });
};

// This function is to create an object with the inputs to send to the server
export function createWordJson() {
  const perfect = [];
  const correct = [];
  const absent = [];
  // Quiero trabajar con las palabras en si no con cada letra.
  document.querySelectorAll('.wordle-word').forEach((inputElement) => {
      inputElement.querySelectorAll('.letter-input').forEach((letter) => {
          let letterPosition = letter.id % 5;
          const letterText = letter.textContent;
          let used = false;
          if (letterPosition === 0) {
              letterPosition = 5;
          }
          if (letter.classList.contains('perfect')) {
              for (const pLetter of perfect) {
                  if (pLetter.letter === letterText && pLetter.position === letterPosition) {
                      used = true;
                      break;
                  }
              }
              if (!used) {
                  perfect.push({
                      letter: letterText,
                      position: letterPosition
                  })
              }
          }
          else if (letter.classList.contains('correct')) {
              for (const cLetter of correct) {
                  if (cLetter.letter === letterText && cLetter.position === letterPosition) {
                      used = true;
                      break;
                  }
              }
              if (!used) {
                  correct.push({
                      letter: letterText,
                      position: letterPosition
                  })
              }
          }
          else { // Absent
              for (const aLetter of absent) {
                  if (aLetter.letter === letterText){
                      if (aLetter.position.length !== 0 && !aLetter.position.includes(letterPosition)) {
                          aLetter.position.push(letterPosition);
                      }
                      used = true;
                      break
                  }
              }
              if (!used) { // No se utilizo antes.
                  if (letterInObject(letterText, perfect) || letterInObject(letterText, correct)) {
                      absent.push({
                          letter: letterText,
                          position: [letterPosition]
                      }) // First push of the letter.
                  }
                  else {
                      absent.push({
                          letter: letterText,
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

export async function callApi(words) {
  await fetch('/api', {
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
  let htmlDisplay = '';
  for (const word of response.words) {
    htmlDisplay += `<button class="button-display">${word.word}</button>`;
  }
  document.querySelector('.word-display').innerHTML = htmlDisplay;
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