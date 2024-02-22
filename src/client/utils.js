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
  document.querySelectorAll('.letter-input').forEach((inputElement) => {
    let usedLetter = false;
    if (inputElement.classList.contains('perfect')) {
      for (const p of perfect) {
        if (p.letter === inputElement.textContent && p.position === inputElement.id % 5) {
          usedLetter = true;
          break;
        }
      }
      if (!usedLetter) {
        perfect.push({
          letter: inputElement.textContent,
          position: inputElement.id % 5 === 0 ? 5 : inputElement.id % 5
        });
      }
    }
    else if (inputElement.classList.contains('correct')) {
      // I dont want to repeat the same letter in the same position
      for (const c of correct) {
        if (c.letter === inputElement.textContent && c.position === inputElement.id % 5) {
          usedLetter = true;
          break;
        }
      }
      if (!usedLetter) {
        correct.push({
          letter: inputElement.textContent,
          position: inputElement.id % 5 === 0 ? 5 : inputElement.id % 5
        });
      }
    }
    else { // If it is absent cant be repeated or perfect or correct
      const inputLetter = inputElement.textContent;
      usedLetter = auxLetterIteration(inputLetter, absent);
      if (!usedLetter) {
        usedLetter = auxLetterIteration(inputLetter, perfect);
        if (!usedLetter) {
          usedLetter = auxLetterIteration(inputLetter, correct);
          if (!usedLetter) {
            absent.push({ letter: inputLetter});
          }
        }
      }
    }
  });
  return {
    perfect,
    correct,
    absent
  };
};

function auxLetterIteration(inputElementLetter, object) {
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
  }).catch(error => {
    console.error(error)
  });
};