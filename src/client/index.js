import './main.css';
import { classChanger } from './utils';
import { callApi } from './validation';

document.querySelector('#app').innerHTML = `
  <div class="wordle">
    <div class="wordle-word">
      <div
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
      <div
        class="letter-input unselectable unknown"
        data-state="empty"
        readonly
      ></div>
    </div>
    <div class="animated-div idle" data-state="idle"></div>
    <footer>
      <button id="reset-button" class="button unselectable">Reset</button>
      <button id="submit-button" class="button unselectable">Get words</button>
    </footer>
  </div>
`;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    const inputElement = document.querySelectorAll('.letter-input[data-state="filled"]');
    if (inputElement.length > 0){
      const element = inputElement[inputElement.length - 1];
      console.log(inputElement);
      element.textContent = '';
      element.dataset.state = 'empty';
      element.classList.remove('correct');
      element.classList.remove('perfect');
      element.classList.remove('absent');
      element.classList.add('unknown');
    }
    return;
  }
  if (e.key === 'Enter') {
    console.log('Enter');
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

document.querySelectorAll('.letter-input').forEach((inputElement) => {
  inputElement.addEventListener('click', () => {
    if (inputElement.dataset.state === 'filled') {
      classChanger(inputElement);
    }
  });
});

document.querySelector('#submit-button').addEventListener('click', () => {
  callApi();
});

document.querySelector('#reset-button').addEventListener('click', () => {
  document.querySelectorAll('.letter-input').forEach((inputElement) => {
    inputElement.textContent = '';
    inputElement.dataset.state = 'empty';
    inputElement.classList.remove('correct');
    inputElement.classList.remove('perfect');
    inputElement.classList.remove('absent');
    inputElement.classList.add('unknown');
  });
});
