const {
  toChars,
  containsLetters,
  containsNumbers,
  containsSpecialChars,
  hasMinimumLength,
  containsWhiteSpaces,
  hasMinimumAndMaximumLength,
} = require('../utils/string-validators')

describe('containsLetters', () => {
  it('should return false, empty string', () => {
    const actual = containsLetters('')
    expect(actual).toBe(false)
  })

  it('should return false, not containing letters', () => {
    const actual = containsLetters('1234')
    expect(actual).toBe(false)
  })

  it('should return true, containing letters only', () => {
    const actual = containsLetters('asdfghjkl')
    expect(actual).toBe(true)
  })

  it('should return true, containing letters with numbers', () => {
    const actual = containsLetters('qwer1234')
    expect(actual).toBe(true)
  })
})
