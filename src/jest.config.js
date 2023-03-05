module.exports = {
  testEnvironment: "node",
  transform: {},
  transformIgnorePatterns: [],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: true,
    },
  },
  moduleNameMapper: {},
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["<rootDir>/src"],
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".js", ".jsx"],
  esm: {
    node: true,
    jest: true,
  },
};
