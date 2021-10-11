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

describe('hasMinimumLength', () => {
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

describe('containsWhiteSpaces', () => {
  it('should return false, empty string', () => {
    const actual = containsWhiteSpaces('')
    expect(actual).toBe(false)
  })

  it('should return false, string without spaces', () => {
    const actual = containsWhiteSpaces('thelazydog')
    expect(actual).toBe(false)
  })

  it('should return true, string without spaces', () => {
    const actual = containsWhiteSpaces('the lazy dog')
    expect(actual).toBe(true)
  })
})

describe.only('hasMinimumAndMaximumLength', () => {
  it('should return false, empty string', () => {
    const actual = hasMinimumAndMaximumLength('', 3, 8)
    expect(actual).toBe(false)
  })

  it('should return true, string with more than min and less than max', () => {
    const actual = hasMinimumAndMaximumLength('the lazy dog', 3, 12)
    expect(actual).toBe(true)
  })

  it('should return false, string with more than min and less than max', () => {
    const actual = hasMinimumAndMaximumLength('Kamryn_Rodriguez82', 3, 10)
    expect(actual).toBe(false)
  })
})
