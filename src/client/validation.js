export function letterValidation(){
    const inputElements = document.querySelectorAll('.letter-input')
    for (const element of inputElements) {
        if (element.classList.contains('unknown')) {
            return false
        }
    }
    return true
}

export async function callApi(){
    console.log('callApi');
    if (letterValidation()){
        console.log('calling api');
        const word = document.querySelectorAll('.letter-input')
        let wordString = ''
        for (const letter of word) {
            wordString += letter.textContent
        }
        const response = await fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {word: wordString}
        });
        const data = await response.json()
        console.log(data)
    }
}