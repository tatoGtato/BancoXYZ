module.exports = {
  testEnvironment: 'node',

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library|expo|expo-modules-core)/)',
  ],

  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};
