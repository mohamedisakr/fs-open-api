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

describe('containsNumbers', () => {
  it('should return false, empty string', () => {
    const actual = containsNumbers('')
    expect(actual).toBe(false)
  })

  it('should return false, not containing numbers', () => {
    const actual = containsNumbers('asdfg')
    expect(actual).toBe(false)
  })

  it('should return true, containing numbers only', () => {
    const actual = containsNumbers('9870')
    expect(actual).toBe(true)
  })

  it('should return true, containing letters with numbers', () => {
    const actual = containsNumbers('qwer1234')
    expect(actual).toBe(true)
  })
})

describe('containsSpecialChars', () => {
  it('should return false, empty string', () => {
    const actual = containsSpecialChars('')
    expect(actual).toBe(false)
  })

  it('should return false, not containing numbers', () => {
    const actual = containsSpecialChars('asdfg')
    expect(actual).toBe(false)
  })

  it('should return false, containing numbers only', () => {
    const actual = containsSpecialChars('9870')
    expect(actual).toBe(false)
  })

  it('should return false, containing letters with numbers', () => {
    const actual = containsSpecialChars('qwer1234')
    expect(actual).toBe(false)
  })

  it('should return true, containing 1 special char', () => {
    const actual = containsSpecialChars('qwer@1234')
    expect(actual).toBe(true)
  })

  it('should return true, containing more than 1 special char', () => {
    const actual = containsSpecialChars('qwer@1234^%')
    expect(actual).toBe(true)
  })
})

describe.only('hasMinimumLength', () => {
  it('should return false, empty string', () => {
    const actual = hasMinimumLength('', 3)
    expect(actual).toBe(false)
  })

  it('should return true, string with more than min', () => {
    const actual = hasMinimumLength('username', 7)
    expect(actual).toBe(true)
  })

  it('should return false, string with less than min', () => {
    const actual = hasMinimumLength('tola', 7)
    expect(actual).toBe(false)
  })
})
