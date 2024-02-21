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
  document.querySelectorAll('.letter-input').forEach((inputElement, index) => {
    if (inputElement.textContent !== '') {
      if (inputElement.classList.contains('perfect')) {
        perfect.push({
          letter: inputElement.textContent,
          position: index + 1
        });
      } else if (inputElement.classList.contains('correct')) {
        correct.push({
          letter: inputElement.textContent,
          position: index + 1
        });
      } else if (inputElement.classList.contains('absent')) {
        absent.push(inputElement.textContent);
      }
    }
  });
  return {
    perfect,
    correct,
    absent
  };
};

export async function callApi(words) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ words })
  });

  const data = await response.json();
  console.log(data); // Control
  if (data.words.length === 0) {
    console.log('No words found');
  }
  for (const word of data.words) {
    console.log(word); // Control
  }
};