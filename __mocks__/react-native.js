const React = require('react');

// Create proper React Native components that work with react-testing-library
const Text = React.forwardRef(({ children, ...props }, ref) => {
  return React.createElement('text', { ...props, ref }, children);
});
Text.displayName = 'Text';

const View = React.forwardRef(({ children, ...props }, ref) => {
  return React.createElement('view', { ...props, ref }, children);
});
View.displayName = 'View';

const Image = React.forwardRef((props, ref) => {
  return React.createElement('image', { ...props, ref });
});
Image.displayName = 'Image';

const ScrollView = React.forwardRef(({ children, ...props }, ref) => {
  return React.createElement('scrollview', { ...props, ref }, children);
});
ScrollView.displayName = 'ScrollView';

const Pressable = React.forwardRef(({ children, onPress, disabled, ...props }, ref) => {
  const handlePress = (e) => {
    if (!disabled && onPress) {
      onPress(e);
    }
  };

  return React.createElement(
    'pressable',
    {
      ...props,
      ref,
      onClick: handlePress,
      disabled,
      'data-testid': props.testID,
    },
    children
  );
});
Pressable.displayName = 'Pressable';

const TouchableWithoutFeedback = React.forwardRef(({ children, onPress, ...props }, ref) => {
  return React.createElement(
    'touchablewithoutfeedback',
    {
      ...props,
      ref,
      onClick: onPress,
      'data-testid': props.testID,
    },
    children
  );
});
TouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';

const KeyboardAvoidingView = React.forwardRef(({ children, ...props }, ref) => {
  return React.createElement('keyboardavoidingview', { ...props, ref, 'data-testid': props.testID }, children);
});
KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

const TextInput = React.forwardRef(
  ({ placeholder, value, onChangeText, editable, secureTextEntry, testID, ...props }, ref) => {
    const [val, setVal] = React.useState(value || '');

    const handleChange = (e) => {
      const newValue = e.target.value;
      setVal(newValue);
      if (onChangeText) {
        onChangeText(newValue);
      }
    };

    // Store reference for fireEvent.changeText
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
      ...inputRef.current,
      value: value !== undefined ? value : val,
      _fiber: {
        memoizedProps: {
          value: value !== undefined ? value : val,
          placeholder,
        },
      },
    }));

    return React.createElement('textinput', {
      ...props,
      ref: inputRef,
      placeholder,
      value: value !== undefined ? value : val,
      onChange: handleChange,
      type: secureTextEntry ? 'password' : 'text',
      disabled: editable === false,
      'data-testid': testID,
    });
  }
);
TextInput.displayName = 'TextInput';

const FlatList = React.forwardRef(({ data, renderItem, ListEmptyComponent, ...props }, ref) => {
  const items = data && data.length > 0 
    ? data.map((item, index) => renderItem({ item, index }))
    : ListEmptyComponent;
  
  return React.createElement('flatlist', { ...props, ref }, items);
});
FlatList.displayName = 'FlatList';

const ActivityIndicator = React.forwardRef((props, ref) => {
  return React.createElement('activityindicator', { ...props, ref });
});
ActivityIndicator.displayName = 'ActivityIndicator';

module.exports = {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Keyboard: {
    dismiss: jest.fn(),
  },
  Platform: {
    OS: 'ios',
  },
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => {
      if (Array.isArray(style)) {
        return style.reduce((acc, s) => ({ ...acc, ...s }), {});
      }
      return style;
    },
  },
};

