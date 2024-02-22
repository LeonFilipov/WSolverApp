import './main.css';
import { callApi, createWordJson, eventListenerInputs, resetInput } from './utils';
import { letterValidation } from './validation';

var letterInputId = 6;
var wordleWordId = 2;

// This function is to create the initial app structure
document.querySelector('#app').innerHTML = `
  <div class="wordle">
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
    callApi();
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
document.querySelector('#submit-button').addEventListener('click', () => {
  if (letterValidation()) {
    const words = createWordJson();
    callApi(words);    
  }
  else {
    // TODO: Show a message to the user plus animations
    console.log('Not all letters are filled');
  }
});

// The reset button only cleans the inputs
document.querySelector('#reset-button').addEventListener('click', () => {
  document.querySelectorAll('.letter-input').forEach((inputElement) => {
    resetInput(inputElement);
  });
});

// Behavior of the add word button
document.querySelector('#add-word-button').addEventListener('click', () => {
  if (wordleWordId <= 4) {
    const lastElement = document.querySelector('.last');
    lastElement.classList.remove('last');
    const newElement = lastElement.cloneNode(true);
    newElement.id = `wordle-word-${wordleWordId}`;
    wordleWordId += 1;
    newElement.classList.add('last');

    // Add event listener and id to the new inputs
    newElement.querySelectorAll('.letter-input').forEach((inputElement) => {
      eventListenerInputs(inputElement);
      inputElement.id = letterInputId;
      letterInputId += 1;
      resetInput(inputElement);
    });
    document.querySelector('.wordle').insertBefore(newElement, document.querySelector('.animated-div'));
  }
  else {
    // TODO: pop-up message to the user
    console.log('Only 4 words are allowed');
  }
});

// Behavior of the remove word button
document.querySelector('#remove-word-button').addEventListener('click', () => {
  const lastElement = document.querySelector('.last');
  if (lastElement.id !== 'wordle-word-1') { // The first word can't be removed
    lastElement.classList.remove('last');
    lastElement.previousElementSibling.classList.add('last');
    lastElement.remove();
    letterInputId -= 5;
    wordleWordId -= 1;
  }
});