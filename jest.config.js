module.exports = {
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['./src/setupTests.js'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 100,
      lines: 85
    }
  }
}
