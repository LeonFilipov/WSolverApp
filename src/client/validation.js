export function letterValidation(){
    const inputElements = document.querySelectorAll('.letter-input')
    for (const element of inputElements) {
        if (element.classList.contains('unknown')) {
            return false
        }
    }
    return true
}