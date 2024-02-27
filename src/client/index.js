import './main.css';
import { callApi, createWordJson, eventListenerInputs, resetInput, addWord} from './utils';
import { letterValidation } from './validation';

// This function is to create the initial app structure
document.querySelector('#app').innerHTML = `
  <div class="column">
  </div>
  <div class="wordle column">
    <header>
      <h1 class="title">Wordle Solver</h1>
    </header>
    <div id="wordle-word-1" class="wordle-word last">
      <div
        id="1"
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        id="2"
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        id="3"
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        id="4"
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        id="5"
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
    </div>
    <div class="animated-div idle" data-state="idle"></div>
    <footer>
      <button id="reset-button" class="button unselectable">Reset</button>
      <button id="remove-word-button" class="button unselectable"> - </button>
      <button id="add-word-button" class="button unselectable"> + </button>
      <button id="submit-button" class="button unselectable">Get words</button>
    </footer>
  </div>
  <div class="column">
    <div class="word-display">
    </div>
  </div>
`;

// This event listener is to use the keyboard without clicking on the inputs
document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    const inputElement = document.querySelectorAll('.letter-input[data-state="filled"]');
    if (inputElement.length > 0){
      const element = inputElement[inputElement.length - 1];
      resetInput(element);
    }
    return;
  }
  if (e.key === 'Enter') {
    callApi(createWordJson());
    return;
  }
  if (/^[a-zA-Z]$/.test(e.key)) {
    const inputElement = document.querySelector('.letter-input[data-state="empty"]');
    if (inputElement) {
      inputElement.textContent = e.key;
      inputElement.dataset.state = 'filled';
    }
  }
});

// This event listener is to change the state of the input when it is clicked
document.querySelectorAll('.letter-input').forEach((inputElement) => {
  eventListenerInputs(inputElement);
});

// Submit button to call the API
document.querySelector('#submit-button').addEventListener('click', async () => {
  if (letterValidation()) {
    callApi(createWordJson());
  }
  else {
    // TODO: Show a message to the user plus animations
    console.log('Not all letters are filled');
  }
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