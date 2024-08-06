import '../public/main.css';
import { submitWords, createWordObject, eventListenerInputs, resetInput, addWord} from './utils';
import { letterValidation } from './validation';

// Event listener to use the keyboard without select the field
document.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    const inputElement = document.querySelectorAll('.letter-input[data-state="filled"]');
    if (inputElement.length > 0){
      const element = inputElement[inputElement.length - 1];
      resetInput(element);
    }
    return;
  }
  if (event.key === 'Enter') {
    submitWords(createWordObject());
    return;
  }
  if (/^[a-zA-Z]$/.test(event.key)) {
    const inputElement = document.querySelector('.letter-input[data-state="empty"]');
    if (inputElement) {
      inputElement.textContent = event.key;
      inputElement.dataset.state = 'filled';
    }
  }
});

// Event listener is to change the state of the input when it is clicked
document.querySelectorAll('.letter-input').forEach((inputElement) => {
  eventListenerInputs(inputElement);
});

// Submit button to call the API
document.querySelector('#submit-button').addEventListener('click', async () => {
  if (letterValidation()) {
    submitWords(createWordObject());
    return
  }
  // TODO: Show a message to the user plus animations
  console.log('Not all letters are filled');
});

// The reset button only cleans the inputs
document.querySelector('#reset-button').addEventListener('click', () => {
  document.querySelectorAll('.wordle-word').forEach((word) => {
    if (word.id !== 'wordle-word-1') {
      word.remove();
    }
    else {
      word.classList.add('last');
      word.querySelectorAll('.letter-input').forEach((inputElement) => {
        resetInput(inputElement);
      });
    }
  });
  document.querySelectorAll('.button-display').forEach((button) => {
    button.remove();
  });
});

// Behavior of the add word button
document.querySelector('#add-word-button').addEventListener('click', () => {
  addWord();
});

// Behavior of the remove word button
document.querySelector('#remove-word-button').addEventListener('click', () => {
  const lastElement = document.querySelector('.last');
  if (lastElement.id !== 'wordle-word-1') { // The first word can't be removed
    lastElement.classList.remove('last');
    lastElement.previousElementSibling.classList.add('last');
    lastElement.remove();
  }
});