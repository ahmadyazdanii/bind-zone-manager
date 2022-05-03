/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "ts"],

    // The root directory that Jest should scan for tests and modules within
    rootDir: "./src",

    // The glob patterns Jest uses to detect test files
    testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],

    // A map from regular expressions to paths to transformers
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};
