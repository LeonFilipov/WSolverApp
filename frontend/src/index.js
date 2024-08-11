import '../public/main.css';
import { submitWords, createWordObject } from './utils';
import { letterValidation } from './validation';

// Submit button to call the API
document.querySelector('#submit-button').addEventListener('click', async () => {
  if (letterValidation()) {
    submitWords(createWordObject());
    return
  }
  // TODO: Show a message to the user plus animations
  console.log('Not all letters are filled');
});