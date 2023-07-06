export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
export const NUMBER_FIELD_SPEACIAL_CHARACTERS = ["e", "E", "+", "-", "."]
export const NUMBER_FIELD_FUNCTIIONAL_KEYS = ['Backspace', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Control', 'a', 'A', 'Delete', 'Tab', 'Enter']

export const validateYearOnKeyDown = (e) => {
    NUMBER_FIELD_SPEACIAL_CHARACTERS.includes(e.key) && e.preventDefault()
    e.target.value.length >= 4 && !NUMBER_FIELD_FUNCTIIONAL_KEYS.includes(e.key) && e.preventDefault()
}