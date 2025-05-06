module.exports = {
  testEnvironment: 'jsdom', // Use jsdom as the test environment
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/',
    '<rootDir>/tests-examples/',
  ], // Ignore .next and node_modules directories
};
