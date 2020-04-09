module.exports = {
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['./src/setupTests.js']
  //coverageThreshold: {
  //global: {
  //statements: 10,
  //branches: 10,
  //functions: 10,
  //lines: 10
  //}
  //}
}
