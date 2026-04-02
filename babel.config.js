module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["@babel/plugin-transform-flow-strip-types"],
  overrides: [
    {
      include: ["./node_modules/react-native"],
      plugins: ["@babel/plugin-transform-flow-strip-types"],
    },
  ],
};