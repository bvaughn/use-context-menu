module.exports = {
  plugins: ["css-modules-transform"],
  presets: [
    require.resolve("@babel/preset-react"),
    [
      require.resolve("@babel/preset-typescript"),
      { allExtensions: true, disallowAmbiguousJSXLike: true, isTSX: true },
    ],
  ],
};
