module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    detectOpenHandles: true,
    forceExit: true, // Ensure jest exit cleanly
    verbose: true, // Optional: Provides detailed test output
    clearMocks: true, // Resets mocks between test files
    resetModules: false, // Set to true if you want to reload modules between tests
};