module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/controllers/*.ts", "<rootDir>/src/services/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  modulePathIgnorePatterns: ["<rootDir>/build/"],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
}
