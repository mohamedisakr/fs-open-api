// module.exports = {
module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: 'node',
    testTimeout: 20000,
    testMatch: [
      '<rootDir>/controllers/**/*.test.js',
      '<rootDir>/models/**/*.test.js',
      '<rootDir>/routes/**/*.test.js',
      '<rootDir>/utils/**/*.test.js',
      '<rootDir>/__tests__/**/*.test.js',
    ],
  }
}
