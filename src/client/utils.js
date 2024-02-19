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
  }