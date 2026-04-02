// Setup test environment for React Native testing
require('@testing-library/jest-native/extend-expect');

const { screen } = require('@testing-library/react-native');

// Suppress react-test-renderer deprecation warnings
jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
  if (msg.includes("react-test-renderer is deprecated")) return;
  console.warn(msg, ...args);
});

// Add custom query for testID since our mocks use data-testid attribute
if (!screen.getByTestId) {
  screen.getByTestId = function(testID, container) {
    const elements = container ? container.querySelectorAll(`[data-testid="${testID}"]`) : document.querySelectorAll(`[data-testid="${testID}"]`);
    if (elements.length === 0) {
      throw new Error(`Unable to find an element with testID: ${testID}`);
    }
    return elements[0];
  };
}
