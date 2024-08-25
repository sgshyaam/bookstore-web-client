module.exports = {
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/__mocks__/fileMock.js',
      '^.+\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/stylesMock.js',
      '(assets|models)': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(@trimblemaps|array-move|d3|internmap|axios|react-image-crop|@trimble-oss/modus-react-components|cheerio))']
};