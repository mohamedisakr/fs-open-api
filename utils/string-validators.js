/**
 * remove spaces and special characters from string
 * @param {*} str text to remove spaces and special characters
 * @returns
 */
const toChars = (str) => {
  return str.toLowerCase().replace(/[\W_ ]/g, '')
}

/**
 * check if a text contains letters
 * @param {*} str text to check
 * @returns
 */
const containsLetters = (str) => {
  const letters = /[a-zA-Z]/g
  return letters.test(str)
}

/**
 * check if a text contains numbers
 * @param {*} str text to check
 * @returns
 */
const containsNumbers = (str) => {
  const numbers = /[0-9]/g
  return numbers.test(str)
}

/**
 * check if a text contains special characters
 * @param {*} str text to check
 * @returns
 */
const containsSpecialChars = (str) => {
  // If you're using this for passwords, this one has all the special characters defined
  // by OWASP: /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(str)
  const specialChars = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g
  return specialChars.test(str)
}

/**
 * check if a text has at least min length
 * @param {*} str text to check
 * @param {*} min minimum value that text should has
 * @returns
 */
const hasMinimumLength = (str, min) => {
  if (str.length >= min) {
    return true
  }
  return false
}

/**
 * check if a text contains white spaces
 * @param {*} str text to check
 * @returns
 */
const containsWhiteSpaces = (str) => {
  const regex = /\s/gm // /^\S+$/gm;
  return regex.test(str)
}

/**
 * check if a text has at least min length and at most max length
 * @param {*} str text to check
 * @param {*} min minimum value that text should has
 * @param {*} max maximum value that text should has
 * @returns
 */
const hasMinimumAndMaximumLength = (str, min, max) => {
  return str.length >= min && str.length <= max
}

/**
 * checking if a variable is falsey or if it has length attribute
 * equal to zero (which for a string, means it is empty)
 * @param {*} str
 * @returns text to check
 */
const isEmpty = (str) => {
  return !str || str.length === 0
}

/**
 * checking if a variable is falsey or if the string only contains
 * whitespace or is empty
 * @param {*} str text to check
 * @returns
 */
const isBlank = (str) => {
  return !str || /^\s*$/.test(str)
}

module.exports = {
  toChars,
  containsLetters,
  containsNumbers,
  containsSpecialChars,
  hasMinimumLength,
  containsWhiteSpaces,
  hasMinimumAndMaximumLength,
  isEmpty,
  isBlank,
}

// let str = 'the lazy dog *&^ run over big fox ??!!'
// console.log(toChars(str))
// console.log(`${str} contain special chars : ${containsSpecialChars(str)}`)
// console.log(`${str} has min length of 3 : ${hasMinimumLength('', 3)}`)
