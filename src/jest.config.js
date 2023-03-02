module.exports = {
    preset: 'babel-jest',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    moduleFileExtensions: ['js', 'jsx'],
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  